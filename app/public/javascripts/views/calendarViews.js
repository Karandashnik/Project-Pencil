///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var CalendarDayView = Backbone.View.extend({

  render: function() {
    var self = this;
    this.collection.deferred.done(function() {
      var days = []
      self.collection.each(function(model) {
        days.push(model.get("dateId"));
      })
      for (var i=0; i<days.length; i++) {
        self.markCalendar(days[i]);
      }
    })
  },
  markCalendar: function(id) {
    console.log("rendering calendarDayView");
    $("#" + id).addClass("calendarDayNumber");
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
    existingDay.save(existingDay.attributes, {
      success: _.bind(function (model, response) {
        console.log(response);
      }, this),
      error: _.bind(function (model, response) {
        alert('wrong');
      }, this)
    });
  },
  saveNewDay: function() {
    console.log("saving day");
    this.collection.create(this.model, {
      success: _.bind(function (model, response) {
        console.log(response);
    this.markCalendar(this.model.get("dateId"));
      }, this),
      error: _.bind(function (model, response) {
        alert('wrong');
      }, this)
    });
  }
});
