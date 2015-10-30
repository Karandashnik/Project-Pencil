var DayView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.saveNewModel);
  },
  saveNewModel: function(newModel) {
    console.log("Saving", newModel);
    newModel.save();
  },
  render: function() {
    this.$el.html("<p>"+this.dateMonth+ " "+this.dateDay+", "+this.dateYear);
  }
})

var BookingView = Backbone.View.extend({
  render: function() {

  },
  initialize: function() {

  }

})
