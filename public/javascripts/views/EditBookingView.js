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
  $("#editBookingError").append("<h5 class='bookingError'>You must select a service to save changes.</h5>")
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
    var day = model.get("dateId").split("-")[2];
    $("#" + dayModel.get("dateId")).html(day);
    $("#" + dayModel.get("dateId")).removeClass("bookingDay");
    dayModel.destroy();
  }
},

getDateString: function(date) {
  var dateObj = new Date(date);
  var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayOfWeek = weekdays[dateObj.getDay()];
  var month = months[dateObj.getMonth()];
  var dayNum = dateObj.getDate();
  return dayOfWeek + ", " + month + " " + dayNum;
},

render: function() {
  var dateString = this.getDateString(this.model.date);
  var kid = this.model.kid;
  var dateId = this.model.dateId;
  var service = this.model.service === 'Both' ? 'Morning Care & After Care' : this.model.service;
  var $editBookingModal =
              "<div id='editBookingModal' class='modal fade' role='dialog'>" +
                "<div class='modal-dialog'>" +
                  "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                      "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
                      "<h4 class='modal-title'>Edit Booking Details</h4>" +
                    "</div>" +
                    "<div id='editBookingBody' class='modal-body'>" +
                      "<div class='row'>" +
                        "<div class='form-group'>" +
                          "<h3 id=editBookingDate>" + dateString + "</h3>" +
                          "<h4 id='currentBookingInfo'>" + kid + " is scheduled for " + service + "</h4>" +
                          "<h3 id='editHeading'>Edit</h3>" +
                          "<div class='input-group list-group' id='editBookingOptions'>" +
                            "<li class='list-group-item'>" +
                              "<label class='radio-inline bookingRadio editBookingRadio'><input id='morningRadio' name='" + kid + " " + dateId + "' type='radio' value='Morning Care'>Morning Care</label>" +
                              "<label class='radio-inline bookingRadio editBookingRadio'><input id='afterRadio' name='" + kid + " " + dateId + "' type='radio' value='After Care'>After Care</label>" +
                              "<label class='radio-inline bookingRadio editBookingRadio'><input id='bothRadio' name='" + kid + " " + dateId + "' type='radio' value='Both'>Both</label>" +
                            "</li>" +
                            "<div id=editBookingError class='errorMsg'>" +
                            "</div>" +
                          "</div>" +
                        "</div>" +
                        "<div class='form-group'>" +
                          "<button type='submit' class='btn btn-primary' id='saveBookingChanges'>Save Changes</button>" +
                          "<button type='button' class='btn btn-primary' id='deleteBooking'>Delete Booking</button>" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                      "<button type='button' class='btn btn-default clear' id='nevermind' data-dismiss='modal'>Nevermind</button>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>";
              this.$el.html($editBookingModal);
  },
});
