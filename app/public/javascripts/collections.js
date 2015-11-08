

var DayCollection = Backbone.Collection.extend({
    model: DayModel,
    url: '/days'
});

var BookingCollection = Backbone.Collection.extend({
  model: BookingModel,
  url: '/bookings',
  initialize: function() {
    // Assign the Deferred issued by fetch() as a property
    this.deferred = this.fetch({data: {user: currentUser}});
  }
});

var KidCollection = Backbone.Collection.extend ({
  model: KidModel,
  url: '/kids',
  initialize: function() {
    // Assign the Deferred issued by fetch() as a property
    this.deferred = this.fetch({data: {username: currentUser}});
  }
});
