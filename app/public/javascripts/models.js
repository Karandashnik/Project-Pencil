
var DayModel = Backbone.Model.extend({
  defaults: {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getYear(),
    occupied: false,
    bookings: {},
    id: this.date+this.month+this.year
  }
});

var BookingModel = Backbone.Model.extend({
  defaults: {
    service: '',
    user: {},
    startDate: null,
    endDate: null
  }
});

var DashboardModel = Backbone.Model.extend({
  defaults: {
    bookings: []
  }
})
