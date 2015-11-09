

var CalendarDayModel = Backbone.Model.extend({
  defaults: {
    date: "",
    dateId: "",
    user: "",
    bookingCount: 0,
    bookings: []
  }
});

var BookingModel = Backbone.Model.extend({
  defaults: {
    service: "",
    kid: {},
    user: "",
    date: "",
    dateId: ""
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
    kidFullName: "",
    username:"", //for the associated parent//
  }
});
