var BookingView = Backbone.View.extend({
  render: function() {
    var dateString = this.getDateString(this.model.date);
    var editButton = "<button type='button' class='btn btn-xs editBookingButton' data-toggle='modal' data-target='#editBookingModal' id='editBooking'>Edit</button>";
    var service = this.model.service === 'Both'? 'Morning Care & After Care' : this.model.service;
    var openGroup = "<ul class='list-group'>"
    var closeGroup = "</ul>"
    var bookingHtml = "<li class='list-group-item bookingListText'>" + dateString + ": </br>" + this.model.kid + " has " + service + editButton +"</li>";
    this.$el.html(openGroup + bookingHtml + closeGroup);
  },

  getDateString: function(date) {
    var dateObj = new Date(date);
    var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  	var weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var dayOfWeek = weekdays[dateObj.getDay()];
    var month = months[dateObj.getMonth()];
    var dayNum = dateObj.getDate();
    var year = dateObj.getFullYear();
    return dayOfWeek + ", " + month + " " + dayNum + ", " + year;
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
