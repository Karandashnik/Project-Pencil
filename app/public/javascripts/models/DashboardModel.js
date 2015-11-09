var Backbone = require('backbone');

var DashboardModel = Backbone.Model.extend({
    defaults: {
        bookings: []
    }
});

module.exports = DashboardModel;
