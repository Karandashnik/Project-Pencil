var Backbone = require('backbone'),
    DayModel = require('../models/DayModel');

var DayCollection = Backbone.Collection.extend({
    model: DayModel,
    url: '/month'
});

module.exports = DayCollection;