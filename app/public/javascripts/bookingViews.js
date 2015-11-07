///////////////////////////////////////////////
////////////////BOOKING VIEW///////////////////
///////////////////////////////////////////////

var CreateBookingView = Backbone.View.extend({
  render: function(){
    var date = this.model.get("date");
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var dateString = date.toLocaleString('en-US', options)
    var user = this.model.get("user");
    var kids = mainKids.kidCollection.pluck("kidFirstName");
    var formBody = "";
    for (i=0; i<kids.length; i++) {
      var contents = "<div class='row'>" +
                     "<div class='form-group col-md-6 col-md-offset-3'>" +
                     "<h4>" + kids[i] + "</h4>" +
                     "<div id=" + kids[i] + " class='input-group'>" +
                     "<label class='radio-inline'><input type='radio' name=" + "optradio" + i + " value=''>Morning Care</label>" +
                     "<label class='radio-inline'><input type='radio' name=" + "optradio" + i + " value=''>After Care</label>" +
                     "<label class='radio-inline'><input type='radio' name=" + "optradio" + i + " value=''>Both</label>" +
                     "</div>" +
                     "</div>" +
                     "</div>"
      formBody += contents;
    }
    var modal = "<div id='bookingModal' class='modal fade' role='dialog'>" +
                "<div class='modal-dialog'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
                "<h4 class='modal-title'>Make Booking</h4>" +
                "</div>" +
                "<div class='modal-body'>" +
                "<form id='' action='' method=''>" +
                "<div class='row'>" +
                "<div class='form-group col-md-8 col-md-offset-2'>" +
                "<h3 class=''>" + dateString + "</h3>" +
                "</div>" +
                "</div>" +
                formBody +
                "<div class='row'>" +
                "<div class='form-group col-md-6 col-md-offset-3'>" +
                "<button id='addBooking' class='btn btn-primary btn-lg btn-block' type='submit'>Add Booking</button>" +
                "</div>" +
                "</div>" +
                "</form>" +
                "</div>" +
                "<div class='modal-footer'>" +
                "<button type='button' class='btn btn-default clear' data-dismiss='modal'>Nevermind</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
    this.$el.html(modal);
  },
  initialize: function(){

  },
  events: {
      "click .clear" : "clear",
      "click #addBooking" : "addBooking"
  },
  clear: function(){
    this.model.clear();
    this.$el.html("");
    $('.modal-backdrop').remove();
  },
  addBooking: function(){

  }
});

var BookingView = Backbone.View.extend({
  render: function() {

  },
  initialize: function() {

  }

});
