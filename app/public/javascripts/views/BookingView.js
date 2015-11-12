var Backbone = require('backbone');

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

module.exports = BookingView;