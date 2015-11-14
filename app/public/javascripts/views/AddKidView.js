var AddKidView = Backbone.View.extend({

  events: {
    'click #saveKidAddAnother' : 'saveKidAddAnother',
    'click #saveKidClose' : 'saveKidClose'
  },

  saveKidAddAnother: function(event) {
    // is called to allow the post request to give response
    //event.preventDefault();
    var firstName = $('#firstName').val();
    var midInit = $('#midInit').val();
    var lastName = $('#lastName').val();
    var fullName = firstName + ' ' + midInit + ' ' + lastName;
    this.collection.create({kidFirstName: firstName, kidLastName: lastName, kidMidInitial: midInit, kidFullName: fullName, username: currentUser});
    document.getElementById("firstName").value = "";
    document.getElementById("midInit").value = "";
    document.getElementById("lastName").value = "";
  },

  saveKidClose: function(event) {
    // is called to allow the post request to give response
    //event.preventDefault();
    var firstName = $('#firstName').val();
    var midInit = $('#midInit').val();
    var lastName = $('#lastName').val();
    var fullName = firstName + ' ' + midInit + ' ' + lastName;
    this.collection.create({kidFirstName: firstName, kidLastName: lastName, kidMidInitial: midInit, kidFullName: fullName, username: currentUser});
    this.clearAll();
    $('body').removeClass('modal-open');
  },

  clearAll: function() {
    this.$el.html("");
    $('.modal-backdrop').remove();
  },

  initialize: function() {
    this.collection.on('update', this.clear, this);
  },

  render: function() {
    // var self = this;

    var $kidModal = "<div id='kidModal' class='modal fade' role='dialog'>" +
      "<div class='modal-dialog'>" +
      "<div class='modal-content'>" +
      "<div class='modal-header'>" +
      "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
      "<h4 class='modal-title'>Add a Child</h4>" +
      "</div>" +
      "<div class='modal-body'>" +
      "<div class='row'>" +
      "<div class='form-group col-sm-6 col-md-4 col-md-offset-4'>" +
      "<input type ='text' name='firstName' id ='firstName' placeholder='First Name'>" +
      "</div>" +
      "<div class='form-group form-group-xs col-sm-4 col-md-4 col-md-offset-4'>" +
      "<input type ='text' name='midInit' id ='midInit' placeholder='MI'>" +
      "</div>" +
      "<div class='form-group col-sm-6 col-md-3 col-md-offset-4'>" +"<input type ='text' name='lastName' id ='lastName' placeholder='Last Name'>" +
      "</div>" +
      "</div>" +
        // "</form"> +
      "<div class='modal-footer'>" +
      "<button type='submit' class='btn btn-warning' id='saveKidAddAnother'>Save & Add Another</button>" +
      "<button type='submit' class='btn btn-warning' id='saveKidClose'>Save & Close</button>" +
      "<button type='button' class='btn btn-primary clear' data-dismiss='modal'>Done</button>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>";
    this.$el.html($kidModal);
  }
});
