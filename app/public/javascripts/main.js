
var DayCollection = Backbone.Collection.extend({
    url: '/october'
});
var now = new Date();
var DayModel = Backbone.Model.extend({
  defaults:{
    now: Date.now(),
    dateMonth: now.getDate(),
    dateDay: now.getDay(),
    dateYear: now.getYear(),
    events: {},
    users: {},
    occupied: false
  }
});

var DayView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, 'add', this.saveNewModel);
  },
  saveNewModel: function(newModel) {
    console.log("Saving", newModel);
    newModel.save();
  },
  render: function() {
    this.$el.append("<p>"+this.dateMonth+ " "+this.dateDay+", "+this.dateYear);
  }
})
var october = new DayCollection({numDays: 31, month: "october"});
var dayModel = new DayModel();
var dayView = new DayView({model: dayModel, collection: october});
october.add(dayModel);
dayView.render();
