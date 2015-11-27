///////////////////////////////////////////////
////////////////BOOKING VIEW///////////////////
///////////////////////////////////////////////

var CreateBookingView = Backbone.View.extend({

  _getModal: function (formBody, dateString) {
    return  "<div id='bookingModal' class='modal fade' role='dialog'>" +
        "<div class='modal-dialog'>" +
          "<div class='modal-content'>" +
            "<div class='modal-header'>" +
              "<button type='button' class='close clearAll' data-dismiss='modal'>&times;</button>" +
              "<h4 class='modal-title'>Make Booking</h4>" +
            "</div>" +
            "<div id='bookingModalBody' class='modal-body'>" +
              "<form>" +
                "<div class='row'>" +
                  "<div class='form-group'>" +
                    "<h3 class=''>" + dateString + "</h3>" +
                  "</div>" + formBody +
                  "<div class='form-group'>" +
                    "<div id='bookingModalMsg'></div>" +
                  "</div>" +
                  "<div class='form-group'>" +
                    "<button id='saveBooking' class='btn btn-primary btn-lg btn-block' type='button'>Add Bookings</button>" +
                  "</div>" +
                "</div>" +
              "</form>" +
            "</div>" +
            "<div class='modal-footer'>" +
              "<button type='button' class='btn btn-default clearAll' data-dismiss='modal'>Nevermind</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</div>"
  },

  _getFormBody: function (kids) {
    var formBody = "";
    if (kids.length === 0) {
      formBody = "<h4 class='bookingError'>You must add children before you can make any bookings.</h4>"
    } else {
    _.each(kids, function (kid) {
        var contents =  "<div class='list-group'>" +
        "<div class='form-group list-group-item'>" +
        "<h3 class='kids'>" + kid + "</h3>" +
        "<div id=" + kid + " class='input-group'>" +
          "<label class='radio-inline bookingRadio'><input type='radio' name=" + kid + " value='Morning Care'>Morning Care</label>" +
          "<label class='radio-inline bookingRadio'><input type='radio' name=" + kid + " value='After Care'>After Care</label>" +
          "<label class='radio-inline bookingRadio'><input type='radio' name=" + kid + " value='Both'>Both</label>" +
        "</div>" +
        "</div>" +
        "</div>";
        formBody += contents;
      });
    }
    return formBody;
  },

  _getDateString: function () {
    var date = this.model.get("date");
    var options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleString('en-US', options);
  },

  render: function () {
    main.kidCollection.deferred.done(_.bind(function () {
      var formBody = this._getFormBody(main.kidCollection.pluck("kidFirstName"));
      var modal = this._getModal(formBody, this._getDateString());
      this.$el.html(modal);
    }, this))
  },

  events: {
      "click .clearAll": "clearAll",
      "click #saveBooking": "collectBookings"
  },

  clearMsgs: function() {
    $("#bookingModalMsg").html("");
  },

  clearAll: function() {
    this.model.clear();
    this.$el.html("");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
  },

  _getKidName: function (radio) {
    var kid = main.kidCollection.findWhere({kidFirstName: radio.name});
    return main.kidCollection.findWhere({kidFirstName: radio.name}).get("kidFirstName");
  },

  _findBookings: function (kids) {
    var newBookings = [];

    _.each(kids, function (kid) {
      var radios = document.getElementsByName(kid);

      if (radios) {
        _.each(radios, function (radio) {
          if (radio.checked) {
            newBookings.push({
              service: radio.value,
              kid: this._getKidName(radio),
              user: currentUser,
              date: this.model.get("date"),
              dateId: this.model.get("dateId")
            });
          }
        }, this);
      }
    }, this);

    return newBookings;
  },

  collectBookings: function () {
    var kids = main.kidCollection.pluck("kidFirstName");
    var newBookings = this._findBookings(kids) || [];
    newBookings.length === 0 ? this._bookingNullError() : this._doesBookingExist(newBookings);
  },

  _bookingNamesMatch: function (bookingA, bookingB) {
    return bookingA.get('kid') === bookingB.kid;
  },

  _getBookingByDateId: function (booking) {
    return this.collection.where({dateId: booking.dateId})
  },

  _greaterThanOneBooking: function (newBookings) {
    var alreadyExists = [],
      doesNotExist = [];

    _.each(newBookings, function (newBooking) {
      var existingBookings = this._getBookingByDateId(newBooking);
      var shouldWeSave = true;

      if (existingBookings) {
        _.each(existingBookings, function (existingBooking) {
          if (this._bookingNamesMatch(existingBooking, newBooking)) {
            shouldWeSave = false;
            alreadyExists.push(newBooking);
          }
        }, this);
      }

      if (shouldWeSave) {
        doesNotExist.push(newBooking);
      }
    }, this);

    alreadyExists.length === 0 ? this._saveBookings(doesNotExist) : this._bookingExistsError(alreadyExists);
  },

  _lessThanOneBooking: function (newBookings) {
    var initialExistingBooking = newBookings[0];
    var existingBooking = this._getBookingByDateId(initialExistingBooking);
    var shouldWeSave = true;

    if (existingBooking) {
      _.each(existingBooking, function (booking) {
        if (this._bookingNamesMatch(booking, initialExistingBooking)) {
          shouldWeSave = false;
          this._bookingExistsError(newBookings);
        }
      }, this);
    }

    if (shouldWeSave) {
      this._saveBookings(newBookings)
    }
  },

  _doesBookingExist: function (newBookings) {
    this.collection.deferred.done(_.bind(function () {
      newBookings.length > 1 ? this._greaterThanOneBooking(newBookings) : this._lessThanOneBooking(newBookings);
    }, this));
  },

  _bookingNullError: function () {
    var errorMessage = "<h5 class='bookingError'>You must select a booking in order to save.</h5>";

    this._addBookingModalMessage(errorMessage)
  },

  _getKidNames: function (bookings) {
    return _.map(bookings, function (booking) {
      return booking.kid;
    });
  },

  _getMultipleKidsMessage: function (kidString, lastKid) {
    return "<h5 class='bookingError'>" + kidString + ", and " + lastKid + " are already scheduled for care on this day.</h5>";
  },

  _getTwoKidsMessage: function (kidString) {
    return "<h5 class='bookingError'>" + kidString + " are already scheduled for care on this day.</h5>";
  },

  _getSingleKidsMessage: function (kidString) {
    return "<h5 class='bookingError'>" + kidString + " is already scheduled for care on this day.</h5>";
  },

  _addBookingModalMessage: function (message) {
    $("#bookingModalMsg").html("");
    $("#bookingModalMsg").append(message)
  },

  _bookingExistsError: function (alreadyExists) {
    var kidNames,
        lastKid,
        kidString;

    $("#bookingModalMsg").html("");

    if (alreadyExists.length > 2) {
      kidNames = this._getKidNames(alreadyExists);

      lastKid = kidNames.pop();
      kidString = kidNames.join(', ');
      this._addBookingModalMessage(this._getMultipleKidsMessage(kidString, lastKid));
    } else {
      if (alreadyExists.length === 2) {
        kidNames = this._getKidNames(alreadyExists);
        kidString = kidNames.join(' and ');
        this._addBookingModalMessage(this._getTwoKidsMessage(kidString));
      } else {
        kidString = alreadyExists[0].kid;
        this._addBookingModalMessage(this._getSingleKidsMessage(kidString));
      }
    }
  },

  _constructCalendarModel: function (booking) {
    return new CalendarDayModel({
      dateId: booking.dateId,
      user: currentUser,
    //  bookingCount: 1
    });
  },

  _constructCalendarDayView: function (calendarDayModel) {
    return new CalendarDayView({
      model: calendarDayModel,
      collection: main.calendarDayCollection
    });
  },

  _saveBookings: function (bookingsArray) {
    main.calendarDayCollection.deferred.done(_.bind(function () {
      _.each(bookingsArray, function (booking) {
        var calendarDayView = this._constructCalendarDayView(this._constructCalendarModel(booking));
        calendarDayView.investigateNewBooking();
        this.collection.create(booking);
      }, this);
    }, this));

    this.clearAll();
  }
});
