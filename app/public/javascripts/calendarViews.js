
///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var DayView = Backbone.View.extend({
  initialize: function() {
    //Listen for events being added to the day
    //this.collection.on('add', this.render, this);
    this.collection.on('update', this.render, this);
  },

  // render: function () {
  //      var that = this, p;
  //      console.log('fetching...');
  //      p = this.collection.fetch();
  //      p.done(function () {
  //          console.log('fetched!');
  //          _.each(that.collection.models, function (item) {
  //              that.renderApp(item);
  //          }, that);
  //      });
  //},
  render: function() {
    //var p = this.collection.fetch({data: {user: currentUser}});

  }
});
