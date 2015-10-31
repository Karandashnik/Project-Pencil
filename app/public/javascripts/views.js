///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var DayView = Backbone.View.extend({
  initialize: function() {
    //Listen for events being added to the day
    this.listenTo(this.collection, "add", this.update);
    this.listenTo($("td"), "click", this.render);
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

//previous DayView, don't want to delete yet
// var DayView = Backbone.View.extend({
//   initialize: function() {
//     this.listenTo(this.collection, 'add', this.saveNewModel);
//   },
//   saveNewModel: function(newModel) {
//     console.log("Saving", newModel);
//     newModel.save();
//   },
//   render: function() {
//     this.$el.html("<p>"+this.dateMonth+ " "+this.dateDay+", "+this.dateYear);
//   }
// })

///////////////////////////////////////////////
////////////////BOOKING VIEW///////////////////
///////////////////////////////////////////////
var BookingView = Backbone.View.extend({
  render: function() {

  },
  initialize: function() {

  }

});
///////////////////////////////////////////////
//////////////DASHBOARD VIEW///////////////////
///////////////////////////////////////////////
var DashboardView = Backbone.View.extend({
  render: function() {

  },
  initialize: function() {

  }
});
