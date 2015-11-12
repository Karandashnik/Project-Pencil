var Backbone = require('backbone');

var BookingModel = Backbone.Model.extend({
  defaults: {
    service: "",
    kid: {},
    user: "",
    date: "",
    dateId: ""
  }
});

module.exports = BookingModel;