

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
    bookings: []
  }
})

var KidModel = Backbone.Model.extend({
  defaults: {
    kidFirstName: "Happy",
    kidLastName: "",
    kidMidInitial: "",
    kidFullName:"",
    username:"", //for the associated parent//
  }
});
