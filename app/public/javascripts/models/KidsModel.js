var Backbone = require('backbone');

//To be used integration with kid-reg modal and dashboard list of kids
var KidsModel = Backbone.Model.extend({
    defaults: {
        kidFirstName: "",
        kidLastName: "",
        kidMidInitial: "",
        kidFullName: ""
        // kids: {},//MOVE to USER MODEL
    }
});

module.exports = KidsModel;