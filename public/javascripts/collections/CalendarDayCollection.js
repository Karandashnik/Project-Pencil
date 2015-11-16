var CalendarDayCollection = Backbone.Collection.extend({
  model: CalendarDayModel,
  url: '/days',
  initialize: function() {
    // Assign the Deferred issued by fetch() as a property
    this.deferred = this.fetch({data: {user: currentUser}});
  }
});
