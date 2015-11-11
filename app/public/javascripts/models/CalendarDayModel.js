var CalendarDayModel = Backbone.Model.extend({
  defaults: {
    date: "",
    dateId: "",
    user: "",
    bookingCount: 0,
    bookings: []
  }
});
