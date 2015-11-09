var Backbone = require('backbone');

var CreateBookingView = Backbone.View.extend({
    render: function(){
        var date = "This day is " + this.model.get("date");
        var user = " and the user is " + this.model.get("user");
        var modal = "<div id='bookingModal' class='modal fade' role='dialog'><div class='modal-dialog'>" +
            "<div class='modal-content'><div class='modal-header'><button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
            "<h4 class='modal-title'>Make Appointment</h4></div><div class='modal-body'></div>" +
            "<div>" + date + user + "</div>" +
            "<div class='modal-footer'><button type='button' class='btn btn-default clear' data-dismiss='modal'>Nevermind</button></div></div></div></div>"
        this.$el.html(modal);
    },
    initialize: function(){

    },
    events: {
        "click .clear" : "clear"
    },
    clear: function(){
        this.model.clear();
        this.$el.html("");
    }
});

module.exports = CreateBookingView;