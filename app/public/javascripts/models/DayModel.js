var Backbone = require('backbone');

var DayModel = Backbone.Model.extend({
    defaults: {
        day: "",
        month: "",
        year: "",
        occupied: false,
        bookings: {},
        id: ""
    }
});

module.exports = DayModel;