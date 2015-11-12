var Backbone = require('backbone');

var KidModel = Backbone.Model.extend({
  defaults: {
    kidFirstName: "",
    kidLastName: "",
    kidMidInitial: "",
    kidFullName: "",
    username:"" //for the associated parent//
  }
});

module.exports = KidModel;
