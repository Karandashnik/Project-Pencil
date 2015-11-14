var BookingView = Backbone.View.extend({
  render: function() {
    var date = new Date(this.model.date);
    var editButton = "<button type='button' class='btn btn-xs btn-info' data-toggle='modal' data-target='#editBookingModal' id='editBooking'>Edit</button>";
    var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
    var dateString = date.toLocaleString('en-US', options);
    var service = this.model.service === 'Both'? 'Morning Care & After Care' : this.model.service;
    var bookingHtml = "<p>" + dateString + ": " + this.model.kid + " has " + service + editButton + "</p>";
    this.$el.html(bookingHtml);
  },

  initialize: function() {
    
  },

  events: {
    "click #editBooking" : "editBooking"
  },

  editBooking: function() {
    var editBookingView = new EditBookingView({collection: this.collection, model: this.model});
    editBookingView.render();
    this.$el.append(editBookingView.$el);
  }
});
