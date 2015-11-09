
var DayCollection = Backbone.Collection.extend({
    model: DayModel,
    url: '/month'
});

var BookingCollection = Backbone.Collection.extend({
  model: BookingModel,
  url: '/booking'
});
