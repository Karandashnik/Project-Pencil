

///////////////////////////////////////////////
//////////////addKid View///////////////////
///////////////////////////////////////////////




///////////////////////////////////////////////
//////////////editKid View///////////////////
///////////////////////////////////////////////

var EditKidView = Backbone.View.extend({

initialize: function() {

},

events: {
  'click #saveChanges' : 'saveChanges',
  'click #deleteOne' : 'deleteOne',
},

saveChanges: function() {
  //event.preventDefault();
  var firstName = $('#editFirstName').val();
  var midInit = $('#editMidInit').val();
  var lastName = $('#editLastName').val();
  var fullName = firstName + ' ' + midInit + ' ' + lastName;
  this.model.save({kidFirstName: firstName, kidMidInitial: midInit, kidLastName: lastName, kidFullName: fullName}, {
    success: _.bind(function (model, response) {
      console.log(response);
      //$("#bookingNotification").prepend("<div class= 'col-md-8 col-md-offset-2'><h4>Your appointments were successfully saved.</h4></div>")
    }, this),
    error: _.bind(function (model, response) {
      alert('wrong');
    }, this)
  });
  console.log(this.model);
  //this.model.save();
  this.clearAll();
},

clearAll: function() {
  this.model.clear();
  this.$el.html("");
  $('.modal-backdrop').remove();
},

deleteOne: function() {
  // var dropIt = this.collection.search.name({kidFullName: kiddos[i]});
  // this.collection.remove(dropIt);

},

render: function() {

  var firstName = this.model.get("kidFirstName");
  var midInit = this.model.get("kidMidInitial");
  var lastName = this.model.get("kidLastName");
  var $editKidModal = "<div id='editKidModal' class='modal fade' role='dialog'>" +
              "<div class='modal-dialog'>" +
              "<div class='modal-content'>" +
              "<div class='modal-header'>" +
              "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
              "<h4 class='modal-title'>Edit a Child</h4>" +
              "</div>" +
              "<div class='modal-body'>" +
              "<div class='row'>" +
              "<div class='form-group col-sm-6 col-md-4 col-md-offset-4'>" +
              "<input type ='text' name='firstName' id ='editFirstName'value="+ firstName + " >" +
              "</div>" +
              "<div class='form-group form-group-xs col-sm-4 col-md-4 col-md-offset-4'>" +
              "<input type ='text' name='midInit' id ='editMidInit' value="+ midInit + ">" +
              "</div>" +
              "<div class='form-group col-sm-6 col-md-3 col-md-offset-4'>" +
              "<input type ='text' name='lastName' id ='editLastName' value=" + lastName +" >" +
              "</div>" +
              "</div>" +
              // "</form"> +
              "<div class='modal-footer'>" +
              "<button type='button' class='btn btn-warning' id='saveChanges'>Save Changes</button>" +
              "<button type='button' class='btn btn-danger' id='deleteOne'>Remove Child</button>" +
              "<button type='button' class='btn btn-primary clear' data-dismiss='modal'>Nevermind</button>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>";
              this.$el.html($editKidModal);
  },

});
