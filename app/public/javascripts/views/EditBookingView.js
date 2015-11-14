///////////////////////////////////////////////
/////////////////EditBookingView///////////////////
///////////////////////////////////////////////

var EditBookingView = Backbone.View.extend({

events: {
  'click #saveBookingChanges' : 'saveNewService',
  'click #deleteBooking' : 'deleteBooking',
  'click #nevermind' : 'clearError'
},

saveNewService: function() {
  var newService = "";
  if (document.getElementById("morningRadio").checked) { newService = "Morning Care" };
  if (document.getElementById("afterRadio").checked) { newService = "After Care" };
  if (document.getElementById("bothRadio").checked) { newService = "Both" };
  nameAndDateArr = document.getElementById("morningRadio").name.split(" ");
  var currBooking = this.collection.findWhere({dateId: nameAndDateArr[1], kid: nameAndDateArr[0]});
  if (newService === "") {
    this.editBookingError();
  } else {
    console.log("Updating booking...");
    currBooking.save({service: newService});
    this.clearAll(currBooking);
  }
},

editBookingError: function() {
  console.log("in editBookingError");
  $("#editBookingError").html("");
  $("#editBookingError").append("<p class='bookingError'>You must select a service to save changes.</p>")
},

clearAll: function(currBooking) {
  currBooking.clear();
  this.$el.html("");
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
},

clearError: function() {
  $("#editBookingError").html("");
},

deleteBooking: function() {
  var nameAndDateArr = document.getElementById("morningRadio").name.split(" ");
  var model =  this.collection.findWhere({dateId: nameAndDateArr[1], kid: nameAndDateArr[0]});
  var dateId = model.get("dateId");
  this.checkCalendarDay(model);
  model.destroy();
  this.clearAll(model);
  $('body').removeClass('modal-open');
},

checkCalendarDay: function(model) {
  var bookingsOnSameDay = this.collection.where({dateId: model.get("dateId")});
  if (bookingsOnSameDay.length <= 1) {
    var dayModel = main.calendarDayCollection.findWhere({dateId: model.get("dateId")});
    $("#" + dayModel.get("dateId")).removeClass("calendarDayNumber");
    dayModel.destroy();
    //this ID exists in calendar.hbs but IT DOESN'T SEEEE ITTTT :-(

  }
},

render: function() {
  var date = new Date(this.model.date);
  var options = { weekday: 'long', month: 'long', day: 'numeric' };
  var dateString = date.toLocaleString('en-US', options);
  var kid = this.model.kid;
  var dateId = this.model.dateId;
  var service = this.model.service === 'Both' ? 'Morning Care & After Care' : this.model.service;
  var $editBookingModal = "<div id='editBookingModal' class='modal fade' role='dialog'>" +
              "<div class='modal-dialog'>" +
              "<div class='modal-content'>" +
              "<div class='modal-header'>" +
              "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
              "<h4 class='modal-title'>Edit Booking Details</h4>" +
              "</div>" +
              "<div class='modal-body'>" +
              "<div class='row'>" +
              "<div class='form-group col-md-9 col-md-offset-1'>" +
              "<h4 class='kids'> Current booking for " + kid + " on " + dateString + " is " + service + ".</h4>" +
              "<div class='input-group'>" +
              "<h4>Edit</h4>" +
              "<label class='radio-inline'><input id='morningRadio' name='" + kid + " " + dateId + "' type='radio' value='Morning Care'>Morning Care</label>" +
              "<label class='radio-inline'><input id='afterRadio' name='" + kid + " " + dateId + "' type='radio' value='After Care'>After Care</label>" +
              "<label class='radio-inline'><input id='bothRadio' name='" + kid + " " + dateId + "' type='radio' value='Both'>Both</label>" +
              "<div id=editBookingError class='errorMsg'></div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "<div class='modal-footer'>" +
              "<button type='submit' class='btn btn-warning' id='saveBookingChanges'>Save Changes</button>" +
              "<button type='button' class='btn btn-danger' id='deleteBooking'>Delete Booking</button>" +
              "<button type='button' class='btn btn-primary clear' id='nevermind' data-dismiss='modal'>Nevermind</button>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";
              this.$el.html($editBookingModal);
  },
});
