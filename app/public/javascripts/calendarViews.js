
///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var CalendarDayView = Backbone.View.extend({

  render: function() {
    var self = this;
    this.collection.deferred.done(function() {

    })
  },
  markCalendar: function(id) {
    console.log("rendering calendarDayView");
    $('#'+ id).append("<span class='glyphicon glyphicon-certificate'></span>");
  },
  investigateNewModel: function() {
    console.log("investigating new model");
    var self = this;
    this.collection.deferred.done(function() {
      var existingDay = self.collection.findWhere({dateId: self.model.get("dateId")});
      existingDay ? self.updateExistingDay(existingDay) : self.saveNewDay();
    })
  },
  updateExistingDay: function(existingDay) {
    console.log("update existing day");
    var newBooking = this.model.get("bookings").pop();
    var newBookingCount = existingDay.get("bookings").push(newBooking);
    existingDay.set("bookingCount", newBookingCount);
    existingDay.save();
  },
  saveNewDay: function() {
    console.log("saving day");
    this.collection.create(this.model);
    this.markCalendar(this.model.get("dateId"));
  },

});
