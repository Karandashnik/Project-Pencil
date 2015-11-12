///////////////////////////////////////////////
////////////////BOOKING VIEW///////////////////
///////////////////////////////////////////////

var CreateBookingView = Backbone.View.extend({

  _getModal: function (formBody, dateString) {
    return "<div id='bookingModal' class='modal fade' role='dialog'>" +
      "<div class='modal-dialog'>" +
      "<div class='modal-content'>" +
      "<div class='modal-header'>" +
      "<button type='button' class='close clearAll' data-dismiss='modal'>&times;</button>" +
      "<h4 class='modal-title'>Make Booking</h4>" +
      "</div>" +
      "<div id='bookingModalBody' class='modal-body'>" +
      "<form>" +
      "<div class='row'>" +
      "<div class='form-group col-md-8 col-md-offset-2'>" +
      "<h3 class=''>" + dateString + "</h3>" +
      "</div>" +
      "</div>" +
      formBody +
      "<div class='row'>" +
      "<div class='form-group col-md-6 col-md-offset-3'>" +
      "<button id='saveBooking' class='btn btn-primary btn-lg btn-block' type='button'>Add Booking</button>" +
      "</div>" +
      "</div>" +
      "<div id='bookingModalMsg'></div>" +
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

    _.each(kids, function (kid) {
      var contents = "<div class='row'>" +
        "<div class='form-group col-md-6 col-md-offset-3'>" +
        "<h4 class='kids'>" + kid + "</h4>" +
        "<div id=" + kid + " class='input-group'>" +
        "<label class='radio-inline'><input type='radio' name=" + kid + " value='Morning Care'>Morning Care</label>" +
        "<label class='radio-inline'><input type='radio' name=" + kid + " value='After Care'>After Care</label>" +
        "<label class='radio-inline'><input type='radio' name=" + kid + " value='Both'>Both</label>" +
        "</div>" +
        "</div>" +
        "</div>";

      formBody += contents;
    });

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
  },

  _getKidObject: function (radio) {
    return main.kidCollection.findWhere({kidFirstName: radio.name}).attributes;
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
              kid: this._getKidObject(radio),
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
    return bookingA.get('kid').kidFirstName === bookingB.kid.kidFirstName;
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
      return booking.kid.kidFirstName;
    });
  },

  _getMultipleKidsMessage: function (kidString, lastKid) {
    return "<div class= 'col-md-8 col-md-offset-2'><h5 class='bookingError'>" + kidString + ", and " + lastKid + " are already scheduled for care on this day.</h5><p>Head to your <a href='/'>dashboard</a> to edit bookings.</p></div>";
  },

  _getSingleKidsMessage: function (kidString) {
    return "<div class= 'col-md-8 col-md-offset-2'><h5 class='bookingError'>" + kidString + " is already scheduled for care on this day.</h5><p>Head to your <a href='/'>dashboard</a> to edit bookings.</p></div>";
  },

  _addBookingModalMessage: function (message) {
    $("#bookingModalMsg").html("");
    $("#bookingModalMsg").prepend(message)
  },

  _bookingExistsError: function (alreadyExists) {
    var kidNames,
        lastKid,
        kidString;

    $("#bookingModalMsg").html("");

    if (alreadyExists.length > 1) {
      kidNames = this._getKidNames(alreadyExists);

      lastKid = kidNames.pop();
      kidString = kidNames.join(', ');
      this._addBookingModalMessage(this._getMultipleKidsMessage(kidString, lastKid));
    } else {
      kidString = alreadyExists[0].kid.kidFirstName;
      this._addBookingModalMessage(this._getSingleKidsMessage(kidString));
    }
  },

  _constructCalendarModel: function (booking) {
    return new CalendarDayModel({
      date: booking.date,
      dateId: booking.dateId,
      bookings: [booking],
      user: currentUser,
      bookingCount: 1
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

        calendarDayView.investigateNewModel();
        this.collection.create(booking, {
          success: _.bind(function (model, response) {
            console.log(response);
            //$("#bookingNotification").prepend("<div class= 'col-md-8 col-md-offset-2'><h4>Your appointments were successfully saved.</h4></div>")
          }, this),
          error: _.bind(function (model, response) {
            alert('wrong');
          }, this)
        });
      }, this);
    }, this));

    this.clearAll();
  }
});

var BookingView = Backbone.View.extend({
  render: function() {
    var date = new Date(this.model.date);
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    var dateString = date.toLocaleString('en-US', options);
    var service = this.model.service === 'Both'? 'Morning Care & After Care' : this.model.service;
    var bookingHtml = "<ul><li>" + dateString + ": " + this.model.kid.kidFirstName + " has " + service + "</li></ul>";
    this.$el.html(bookingHtml);
  }
});

var UsersBookingView = Backbone.View.extend({
  render: function() {
    console.log('hello');
    var self = this;
     this.collection.deferred.done(function() {
  		$("#upcomingBookings").html("<h3>Upcoming Care Bookings</h3>");
  		//Get all the tasks associated with a user
      if (self.collection.length !== 0) {
        listOfBookings = [];
        self.collection.each(function(model){
          var booking = {date: model.get("date"), dateId: model.get("dateId"), kid: model.get("kid"), service: model.get("service"), user: currentUser};
          listOfBookings.push(booking);
        });
        listOfBookings.sort(self.sortBookings);
        listOfBookings.forEach(self.appendBooking, self);
      } else {
  			$("#upcomingBookings").append("<p> You currently don't have any care scheduled.</p>");
  		}
    })
	},
  initialize: function() {
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.collection, "remove", this.render);
  },
  sortBookings: function(a,b) {
    return new Date(a.date) - new Date(b.date);
  },
	appendBooking: function(newModel) {
		var bookingView = new BookingView({model: newModel, collection: main.bookingCollection});
		bookingView.render();
		$("#upcomingBookings").append(bookingView.$el);
	}

});
