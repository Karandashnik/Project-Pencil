///////////////////////////////////////////////
//////////////userKids View///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({
  events: {
    "click #delete" : "deleteItem",
    "click #edit" : "editKid",
    "click #addKid" : "createAddKidView",
  },

  createAddKidView: function() {
     addKidView = new AddKidView({collection: main.kidCollection});
     addKidView.render();
     $('#kidList').append(addKidView.$el);
  },

  render: function() {
    var addKidButton = '<button class = "addKidView btn btn-primary btn-lg" id="addKid" data-toggle="modal" data-target="#kidModal">Add Kid</button>';

    var listBody = "";
    var kiddos = this.collection.pluck("kidFullName");
    console.log(kiddos);
    var title = "<h4 class='listTitle'>" + 'Registered Children' + "</h4>";
    var editButton = "<button class = 'btn btn-warning btn-xs' 'button id='edit' 'type = button'>" + 'Edit' + "</button>";
    for (i = 0; i <kiddos.length; i++) {
    var listContents =  "<div class='row'>" +
                        "<div class='col-md-4'>" +
                        "<ul class ='listOfKids'>" +
                        "<li class='oneKid'>" + kiddos[i] + "</li>" +
                        // "<li class='oneKid'>" + kiddos[i] + editButton + "</li>" +
                        // "<li class='edit'>" + editButton + "</li>" +
                        "</ul>" + "</div>" +
                        "<div class='col-md-2'>" + editButton + "</div>" +
                        "</div>";
    listBody += listContents;
  }
    this.$el.html(addKidButton + title + listBody);
  },

  initialize: function() {
    this.collection.on('update', this.render, this);
  }
});

///////////////////////////////////////////////
//////////////addKid View///////////////////
///////////////////////////////////////////////

var AddKidView = Backbone.View.extend({

  events: {
    'click #submit' : 'saveKid',
    'click #cancel' : 'deleteIt',
    },

  saveKid: function(event) {
      //event.preventDefault() is called to allow the post request to give response
      event.preventDefault();
      var firstName = $('#firstName').val();
      var midInit = $('#midInit').val();
      var lastName = $('#lastName').val();
      var fullName = firstName + ' ' + midInit + ' ' + lastName;
      this.collection.create({kidFirstName: firstName, kidLastName: lastName, kidMidInitial: midInit, kidFullName: fullName, username: currentUser});
  },

  deleteIt: function() {
    this.clear();
  },

  initialize: function() {
    this.collection.on('update', this.clear, this);
  },

  render: function() {
    var self = this;

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
                "<div class='modal-footer'>" +
                "<button type='submit' class='btn btn-warning' id='submit'>Submit</button>" +
                "<button type='reset' class='btn btn-success' id='reset'>Clear</button>" +
                "<button type='button' class='btn btn-primary clear' data-dismiss='modal'>Nevermind</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
                self.$el.html($kidModal);
    },

});
