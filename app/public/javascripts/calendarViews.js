var DayModel = Backbone.Model.extend({
  defaults: {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getYear(),
    occupied: false,
    bookings: [],
    id: this.date+this.month+this.year
  }
});

var BookingModel = Backbone.Model.extend({
  defaults: {
    user: {},
    startDate: null,
    endDate: null,
    title: ''
  }
})

var BookingCollection = Backbone.Collection.extend({
  model: BookingModel
});

var DayView = Backbone.View.extend({
  initialize: function() {
    //Listen for events being added to the day
    this.listenTo(this.collection, "add", this.update);
    this.listenTo($("td"), "click", this.render)
  },
  update: function(newBooking) {
    this.model.set("bookings"[0], newBooking);
  },
  render: function() {
    console.log("Rendering DayView...");
    var html = "<div class='modal fade' role='dialog'><h2>Day "+this.model.attributes.date+"</h2><p>Your bookings: </p><br><ul>";
    this.model.attributes.bookings.forEach(function(booking) {
      html += "<li>"+booking.attributes.title+"</li>"
    });
    html += "</ul></div>"
    this.$el.append(html);
  }
});
//Create a model for each day, and a view and collection for each model
//This doesn't work, since you can't call .forEach after a document.getElementsByTagName(). 
var allDays = document.getElementsByTagName("td");
allDays.forEach(function(td){
  var dayModel = new DayModel({id: td.innerHTML});
  var dayView = new DayView({model: dayModel});
  var bookingCollection = new BookingCollection({});
});
