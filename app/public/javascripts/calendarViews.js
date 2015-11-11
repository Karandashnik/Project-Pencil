///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var CalendarDayView = Backbone.View.extend({
  initialize: function() {
    //Listen for events being added to the day
    //this.collection.on('add', this.render, this);
    //this.collection.on('update', this.render, this);
  },

  // render: function () {
  //      var that = this, p;
  //      console.log('fetching...');
  //      p = this.collection.fetch();
  //      p.done(function () {
  //          console.log('fetched!');
  //          _.each(that.collection.models, function (item) {
  //              that.renderApp(item);
  //          }, that);
  //      });
  //},
  render: function() {
    console.log("calendarDayView rendering....!!");

  },
  investigateNewModel: function() {
    var existingDay = main.calendarDayCollection.findWhere({dateId: this.model.get("dateId")});
    existingDay ? this.updateExistingDay(existingDay) : this.saveNewDay();
  },
  updateExistingDay: function(existingDay) {
    var newBookings = _.clone(existingDay.get("bookings"));
  },
  saveNewDay: function() {
   main.calendarDayCollection.create(this.model);
   this.render();
  },

});
