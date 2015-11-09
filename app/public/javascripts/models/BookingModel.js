var Backbone = require('backbone');

var BookingModel = Backbone.Model.extend({
    defaults: {
        service: "",
        user: {},
        date: ""
    }
});

module.exports = BookingModel;