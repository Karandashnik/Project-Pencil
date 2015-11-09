var Backbone = require('backbone');

var DayView = Backbone.View.extend({
    initialize: function() {
        //Listen for events being added to the day
        this.listenTo(this.collection, "add", this.render);
        //this.listenTo($("td"), "click", this.render);
    },

    update: function(newBooking) {
        //this.model.set("bookings"[0], newBooking);
    },
    render: function() {
        console.log("DayView is rendering");
        var day = this.model.get("day");
        var month = this.model.get("month");
        var year = this.model.get("year");
        var user = currentUser;
        var wholeDay = month + " " + day + ", " + year;
        var bookingCollection = new BookingCollection();
        var bookingModel = new BookingModel({date: wholeDay, user: user})
        var createBookingView = new CreateBookingView({model: bookingModel, collection: bookingCollection});
        createBookingView.render();
        $("#calendar").append(createBookingView.$el);
        // var html = "<div class='modal fade' role='dialog'><h2>Day "+this.model.attributes.date+"</h2><p>Your bookings: </p><br><ul>";
        // this.model.attributes.bookings.forEach(function(booking) {
        //   html += "<li>"+booking.attributes.title+"</li>"
        // });
        // html += "</ul></div>"
        // this.$el.append(html);
    }
});

module.exports = DayView;