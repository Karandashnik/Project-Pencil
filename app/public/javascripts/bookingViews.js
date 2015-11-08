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
                  "<div class='modal-body'>" +
                  "<form>" +
                  "<div class='row'>" +
                  "<div class='form-group col-md-8 col-md-offset-2'>" +
                  "<h3 class=''>" + dateString + "</h3>" +
                  "</div>" +
                  "</div>" +
                  formBody +
                  "<div class='row'>" +
                  "<div class='form-group col-md-6 col-md-offset-3'>" +
                  "<button id='saveBooking' class='btn btn-primary btn-lg btn-block' type='submit'>Add Booking</button>" +
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
      "click #saveBooking": "saveBooking"
  },
  clear: function(){
    this.model.clear();
    this.$el.html("");
    $('.modal-backdrop').remove();
  },
  saveBooking: function(){
    var kids = main.kidCollection.pluck("kidFirstName");
    var date = this.model.get("date");
    for (var i = 0; i<kids.length; i++) {
      var radios = document.getElementsByName(kids[i]);
      for (var j = 0; j<radios.length; j++) {
        if (radios[j].checked) {
          var kidObject = main.kidCollection.findWhere({kidFirstName: radios[j].name}).attributes;
          this.collection.create({service: radios[j].value, kid: kidObject, user: this.model.get("user"), date: this.model.get("date")});
          //this.addBookingToDay({service: radios[j].value, kid: kidObject, user: this.model.get("user"), date: this.model.get("date")});
        }
      }
    }
  },
  addBookingToDay: function(obj){

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
          var booking = {date: model.get("date"), kid: model.get("kid"), service: model.get("service"), user: model.get("user")};
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
