///////////////////////////////////////////////
////////////////BOOKING VIEW///////////////////
///////////////////////////////////////////////

var CreateBookingView = Backbone.View.extend({
  render: function(){
    var self = this;
    main.kidCollection.deferred.done(function() {
      var date = self.model.get("date");
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      var dateString = date.toLocaleString('en-US', options)
      var kids = main.kidCollection.pluck("kidFirstName");
      var formBody = "";
      for (i=0; i<kids.length; i++) {
      var contents = "<div class='row'>" +
                       "<div class='form-group col-md-6 col-md-offset-3'>" +
                       "<h4 class='kids'>" + kids[i] + "</h4>" +
                       "<div id=" + kids[i] + " class='input-group'>" +
                       "<label class='radio-inline'><input type='radio' name=" + kids[i] + " value='Morning Care'>Morning Care</label>" +
                       "<label class='radio-inline'><input type='radio' name=" + kids[i] + " value='After Care'>After Care</label>" +
                       "<label class='radio-inline'><input type='radio' name=" + kids[i] + " value='Both'>Both</label>" +
                       "</div>" +
                       "</div>" +
                       "</div>"
        formBody += contents;
      }
      var modal = "<div id='bookingModal' class='modal fade' role='dialog'>" +
                  "<div class='modal-dialog'>" +
                  "<div class='modal-content'>" +
                  "<div class='modal-header'>" +
                  "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
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
                  "</form>" +
                  "</div>" +
                  "<div class='modal-footer'>" +
                  "<button type='button' class='btn btn-default clear' data-dismiss='modal'>Nevermind</button>" +
                  "</div>" +
                  "</div>" +
                  "</div>" +
                  "</div>";
      self.$el.html(modal);
    })
  },
  events: {
      "click .clear": "clear",
      "click #saveBooking": "collectBookings"
  },
  clear: function(){
    this.model.clear();
    this.$el.html("");
    $('.modal-backdrop').remove();
  },
  collectBookings: function() {
    var kids = main.kidCollection.pluck("kidFirstName");
    var date = this.model.get("date");
    var newBookings = [];
    for (var i = 0; i<kids.length; i++) {
      var radios = document.getElementsByName(kids[i]);
      for (var j = 0; j<radios.length; j++) {
        if (radios[j].checked) {
          var kidObject = main.kidCollection.findWhere({kidFirstName: radios[j].name}).attributes;
          var newBooking = {service: radios[j].value, kid: kidObject, user: currentUser, date: date, dateId: this.model.get("dateId")};
          newBookings.push(newBooking);
        }
      }
    }
    console.log(newBookings);
    newBookings.length === 0 ? this.bookingNullError() : this.doesBookingExist(newBookings);
  },
  doesBookingExist: function(newBookings) {
    //event.preventDefault();
    var self = this;
    this.collection.deferred.done(function() {
      if (newBookings.length > 1) {
        var alreadyExists = [];
        var doesNotExist = [];
        for (var i=0; i<newBookings.length; i++) {
          //console.log(self.collection.models);
          var existingBooking = self.collection.where({dateId: newBookings[i].dateId})
          var shouldWeSave = true;
          //console.log(existingBooking);
          if (existingBooking) {
            for (var j=0; j<existingBooking.length; j++) {
              if (existingBooking[j].get("kid").kidFirstName === newBookings[i].kid.kidFirstName) {
                shouldWeSave = false;
                alreadyExists.push(newBookings[i]);
              }
            }
          }
          if (shouldWeSave) {
            doesNotExist.push(newBookings[i]);
          }
        }
        //console.log(alreadyExists);
        //console.log(doesNotExist);
        alreadyExists.length === 0 ? self.saveBookings(doesNotExist) : self.bookingExistsError(alreadyExists);
      } else {
        //console.log(self.collection.models);
        var existingBooking = self.collection.where({dateId: newBookings[0].dateId});
        var shouldWeSave = true;
        if (existingBooking) {
          for (var i=0; i<existingBooking.length; i++) {
            if (existingBooking[i].get("kid").kidFirstName === newBookings[0].kid.kidFirstName) {
              shouldWeSave = false;
              self.bookingExistsError(newBookings);
            }
          }
        }
        if (shouldWeSave) {
          self.saveBookings(newBookings)
        }
      }
    })
  },
  bookingNullError: function(){
    $("#bookingModalBody").prepend("<h5 class='bookingError'>You must select a booking in order to save.</h5>")
  },
  bookingExistsError: function(alreadyExists){
    if (alreadyExists.length > 1) {
      kidNames = [];
      for (var i=0; i<alreadyExists.length; i++) {
        kidNames.push(alreadyExists[i].kid.kidFirstName);
      }
      var lastKid = kidNames.pop();
      var kidString = kidNames.join(', ');
      $("#bookingModalBody").prepend("<div class= 'col-md-8 col-md-offset-2'><h5 class='bookingError'>" + kidString + ", and " + lastKid + " are already scheduled for care on this day.</h5><p>Head to your <a href='/'>dashboard</a> to edit bookings.</p></div>");
    } else {
      var kidString = alreadyExists[0].kid.kidFirstName;
      console.log(kidString);
      $("#bookingModalBody").prepend("<div class= 'col-md-8 col-md-offset-2'><h5 class='bookingError'>" + kidString + " is already scheduled for care on this day.</h5><p>Head to your <a href='/'>dashboard</a> to edit bookings.</p></div>")
    }
  },
  saveBookings: function(bookingsArray){
    var self = this;
    console.log("made it to saving");
    //console.log(bookingsArray);
    main.calendarDayCollection.deferred.done(function() {
      for (var i = 0; i<bookingsArray.length; i++) {
        console.log("made it save loop");
        var calendarDayModel = new CalendarDayModel({date: bookingsArray[i].date, dateId: bookingsArray[i].dateId, bookings: [bookingsArray[i]], user: currentUser, bookingCount: 1});
        var calendarDayView = new CalendarDayView({model: calendarDayModel});
        calendarDayView.investigateNewModel();
        self.collection.create(bookingsArray[i]);
        console.log("Saving booking...");
        //$("#bookingNotification").prepend("<div class= 'col-md-8 col-md-offset-2'><h4>Your appointments were successfully saved.</h4></div>")
      };
    });
    this.clear();
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
	},
})
