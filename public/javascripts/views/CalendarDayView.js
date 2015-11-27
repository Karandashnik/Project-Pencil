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

  initialize: function() {
    //this.listenTo(this.collection, "add", this.render);
    //this.listenTo(this.collection, "update", this.render);
  },

  markCalendar: function(id) {
  //  $("#" + id).addClass("calendarDayNumber");
    //$("#" + id).append("<img class='jotBall' src='images/jotBall.png' alt='kid icon'>")
    $("#" + id).addClass("bookingDay");
  },

  investigateNewBooking: function() {
    var self = this;
    this.collection.deferred.done(function() {
      var existingDay = self.collection.findWhere({dateId: self.model.get("dateId")});
      if (!existingDay) {
        self.saveNewDay();
      }
    })
  },

  updateExistingDayOne: function(existingDay) {
    console.log("In updateExistingDayOne");
    var newBookingCount = main.bookingCollection.find({dateId: this.model.get("dateId")}).length + 1;
    existingDay.save({bookingCount: newBookingCount, id: existingDay.get("id")});
  },

  // updateExistingDayTwo: function() {
  //   console.log("In updateExistingDayTwo");
  //   var newBookingCount = main.bookingCollection.find({dateId: this.model.get("dateId")}).length + 1;
  //   this.model.save({bookingCount: newBookingCount, id: this.model.get("id")});
  // },

  // waitForSync: function() {
  //   console.log("in waitForSync");
  //   this.listenTo(this.collection, "sync", function() {
  //     console.log("in waitForSync listenTo");
  //     this.updateExistingDayTwo();
  //   });
  // },

  saveNewDay: function() {
    console.log("In saveNewDay");
    this.collection.create(this.model, {
      success: _.bind(function (model, response) {
        console.log(response);
    this.markCalendar(this.model.get("dateId"));
      }, this),
      error: _.bind(function (model, response) {
        console.log('wrong');
      }, this)
    });
  }
});
