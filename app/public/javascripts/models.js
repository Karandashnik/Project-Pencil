

var DayModel = Backbone.Model.extend({
  defaults: {
    date: "",
    bookings: {}
  }
});

var BookingModel = Backbone.Model.extend({
  defaults: {
    service: "",
    kid: {},
    user: "",
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
    kidFullName: "",
    username:"", //for the associated parent//
  }
});
