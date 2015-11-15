

///////////////////////////////////////////////
/////////////////EditKidView///////////////////
///////////////////////////////////////////////

var EditKidView = Backbone.View.extend({

events: {
  'click #saveChanges' : 'saveChanges',
  'click #deleteChild' : 'deleteChild',
},

saveChanges: function() {
  //event.preventDefault();
  var firstName = $('#editFirstName').val();
  var midInit = $('#editMidInit').val();
  var lastName = $('#editLastName').val();
  var fullName = firstName + ' ' + midInit + ' ' + lastName;
  this.model.save({kidFirstName: firstName, kidMidInitial: midInit, kidLastName: lastName, kidFullName: fullName});
  this.clearAll();
},

clearAll: function() {
  this.model.clear();
  this.$el.html("");
  $('.modal-backdrop').remove();
  $('body').removeClass('modal-open');
},

deleteChild: function() {
  this.deleteKidBookings();
  this.model.destroy();
  this.clearAll();
},

deleteKidBookings: function() {
  var relatedKidBookings = main.bookingCollection.where({kid: this.model.get("kidFirstName")});
  relatedKidBookings.forEach(function(model) {
    var relatedDateBookings = main.bookingCollection.where({dateId: model.get("dateId")});
    console.log(relatedDateBookings);
    if (relatedDateBookings.length <= 1) {
      var dayModel = main.calendarDayCollection.findWhere({dateId: model.get("dateId")});
      var day = model.get("dateId").split("-")[2];
      $("#" + model.get("dateId")).html(day);
      $("#" + id).removeClass("bookingDay");
      dayModel.destroy();
    }
    model.destroy();
  })
},

render: function() {
  var firstName = this.model.get("kidFirstName");
  var midInit = this.model.get("kidMidInitial");
  var lastName = this.model.get("kidLastName");
  var $editKidModal =
              "<div id='editKidModal' class='modal fade' role='dialog'>" +
                "<div class='modal-dialog'>" +
                  "<div class='modal-content'>" +
                    "<div class='modal-header'>" +
                      "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
                      "<h4 class='modal-title'>Edit Child Details</h4>" +
                    "</div>" +
                    "<div class='modal-body'>" +
                      "<div class='row'>" +
                        "<div class='form-group'> <p>First Name</p>" +
                          "<input class='form-control' type ='text' name='firstName' id ='editFirstName'value="+ firstName + ">" +
                        "</div>" +
                        "<div class='form-group'> <p>Middle Initial</p>" +
                          "<input class='form-control' type ='text' name='midInit' id ='editMidInit' value="+ midInit + ">" +
                        "</div>" +
                        "<div class='form-group'> <p>Last Name</p>" +
                          "<input class='form-control' type ='text' name='lastName' id ='editLastName' value=" + lastName + ">" +
                        "</div>" +
                      "</div>" +
                    "</div>" +
                    "<div class='modal-footer'>" +
                      "<button type='button' class='btn btn-primary' id='saveChanges'>Save Changes</button>" +
                      "<button type='button' class='btn btn-primary' id='deleteChild'>Delete</button>" +
                      "<button type='button' class='btn btn-default clear' data-dismiss='modal'>Nevermind</button>" +
                    "</div>" +
                  "</div>" +
                "</div>" +
              "</div>";
              this.$el.html($editKidModal);
  },
});
