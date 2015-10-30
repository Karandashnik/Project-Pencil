var now = new Date();
var DayModel = Backbone.Model.extend({
  defaults:{
    now: Date.now(),
    dateMonth: now.getDate(),
    dateDay: now.getDay(),
    dateYear: now.getYear(),
    events: {},
    users: {},
    occupied: false
  }
});

var BookingModel = Backbone.Model.extend({
  defaults:{
    service: "",
    date: "",
    user: ""
  }
})
