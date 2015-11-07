
///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var DayView = Backbone.View.extend({
  initialize: function() {
    //Listen for events being added to the day
    this.listenTo(this.collection, "add", this.render);
  },

  update: function(newBooking) {

  },
  render: function() {
    console.log("DayView is rendering");
    var wholeDay = this.model.get("wholeDay");
    var user = currentUser;
    var bookingCollection = new BookingCollection();
    var bookingModel = new BookingModel({date: wholeDay, user: user})
    var createBookingView = new CreateBookingView({model: bookingModel, collection: bookingCollection});
    createBookingView.render();
    $("#calendar").append(createBookingView.$el);
  }
});
