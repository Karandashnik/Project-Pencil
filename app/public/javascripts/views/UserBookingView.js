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
  },
});
