var Backbone = require('backbone'),
    KidModel = require('../models/KidModel.js');

var KidCollection = Backbone.Collection.extend ({
  model: KidModel,
  url: '/kids',
  initialize: function() {
    // Assign the Deferred issued by fetch() as a property
    this.deferred = this.fetch({data: {username: currentUser}});
  }
});

module.exports = KidCollection;