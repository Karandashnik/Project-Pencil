
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
//To be used integration with kid-reg modal and dashboard list of kids
var KidsModel = Backbone.Model.extend({
  defaults: {
    kidFirstName: "",
    kidLastName: "",
    kidMidInitial: "",
    kidFullName: "",
    // kids: {},//MOVE to USER MODEL
  }
});