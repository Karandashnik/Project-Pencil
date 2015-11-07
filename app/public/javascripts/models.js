

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
    kid: {},
    user: {},
    date: {}
  }
});

var DashboardModel = Backbone.Model.extend({
  defaults: {
    bookings: {}
  }
})

var KidModel = Backbone.Model.extend({
  defaults: {
    kidFirstName: "",
    kidLastName: "",
    kidMidInitial: "",
    username:"", //for the associated parent//
  }
});
