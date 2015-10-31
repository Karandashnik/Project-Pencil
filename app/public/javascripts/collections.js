
var DayCollection = Backbone.Collection.extend({
    model: DayModel,
    url: '/october'
});

var BookingCollection = Backbone.Collection.extend({
  model: BookingModel,
  url: '/booking'
});
