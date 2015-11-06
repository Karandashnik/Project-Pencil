

var DayModel = Backbone.Model.extend({
  defaults: {
    day: "",
    month: "",
    year: "",
    occupied: false,
    bookings: {},
    id: ""
  }
});

var BookingModel = Backbone.Model.extend({
  defaults: {
    service: "",
    user: {},
    date: ""
  }
});

var DashboardModel = Backbone.Model.extend({
  defaults: {
    bookings: {}
  }
})
