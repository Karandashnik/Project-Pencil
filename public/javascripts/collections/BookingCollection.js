var BookingCollection = Backbone.Collection.extend({
  model: BookingModel,
  url: '/bookings',
  initialize: function() {
    // Assign the Deferred issued by fetch() as a property
    this.deferred = this.fetch({data: {user: currentUser}});
  }
});
