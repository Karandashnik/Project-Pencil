var Backbone = require('backbone'),
    BookingModel = require('../models/BookingModel');

var BookingCollection = Backbone.Collection.extend({
    model: BookingModel,
    url: '/booking'
});

module.exports = BookingCollection;
