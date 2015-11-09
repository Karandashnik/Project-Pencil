///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////

//Create a model for each day, and a view and collection for each model
//This doesn't work, since you can't call .forEach after a document.getElementsByTagName().
// var allDays = document.getElementsByTagName("td");
// allDays.forEach(function(td){
//   var dayModel = new DayModel({id: td.innerHTML});
//   var dayView = new DayView({model: dayModel});
//   var bookingCollection = new BookingCollection({});
// });

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