var UsersBookingView = Backbone.View.extend({
  render: function() {
    //console.log('hello');
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
        var filteredBookings = listOfBookings.filter(self.dropOldBookings);
        filteredBookings.forEach(self.appendBooking, self);
      } else {
        $("#upcomingBookings").append("<h5 style='padding: 30px 0px 30px 30px'> You don't have any upcoming care scheduled.</h5>");
      }
    })
  },

  initialize: function() {
    this.listenTo(this.collection, "add", this.listenToModel);
    this.listenTo(this.collection, "update", this.render);
  },

  listenToModel: function(newModel) {
    this.listenTo(newModel, "sync", function(model) {
      this.render();
    });
  },

  sortBookings: function(a,b) {
    return new Date(a.date) - new Date(b.date);
  },

  dropOldBookings: function(booking) {
    return new Date(booking.date) >= new Date().setHours(0,0,0,0);
  },

  appendBooking: function(newModel) {
    var bookingView = new BookingView({model: newModel, collection: main.bookingCollection});
    bookingView.render();
    $("#upcomingBookings").append(bookingView.$el);
  }
});
