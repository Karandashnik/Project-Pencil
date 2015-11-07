

var DayCollection = Backbone.Collection.extend({
    model: DayModel,
    url: '/month'
});

var BookingCollection = Backbone.Collection.extend({
  model: BookingModel,
  url: '/bookings'
});

var KidCollection = Backbone.Collection.extend ({
  model: KidModel,
  url: '/kids',
  initialize: function() {
    this.fetch({data: {username: currentUser}});
  }
});
