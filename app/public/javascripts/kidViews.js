///////////////////////////////////////////////
//////////////userKids View///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({
  events: {

    "click #edit" : "editKid",
    "click #addKid" : "createAddKidView",
  },

  editKid: function() {
    editKidView = new EditKidView({collection: main.kidCollection});
    editKidView.render();
    $('#kidList').append(editKidView.$el);
  },

  createAddKidView: function() {
     addKidView = new AddKidView({collection: main.kidCollection});
     addKidView.render();
     $('#kidList').append(addKidView.$el);
  },

  render: function() {
    var addKidButton = '<button class = "addKidView btn btn-warning btn-lg" id="addKid" data-toggle="modal" data-target="#kidModal">Add Child</button>';

    var editChildButton = '<button class = "editKidView btn btn-success btn-lg" id="editKid" data-toggle="modal" data-target="#editModal">Edit Child</button>';

    var listBody = "";
    var kiddos = this.collection.pluck("kidFullName");
    //console.log(kiddos);
    var title = "<h4 class='listTitle'>" + 'Registered Children' + "</h4>";
<<<<<<< HEAD
=======
    var editButton = "<button id= 'edit' class= 'btn btn-warning btn-xs'>Edit</button>";
>>>>>>> master
    for (i = 0; i <kiddos.length; i++) {
    var listContents =  "<div class='row'>" +
                        "<div class='col-md-4'>" +
                        "<ul class ='listOfKids'>" +
                        "<li class='oneKid'>" + kiddos[i] + "</li>" +
                        "</ul>" + "</div>" +
                        "<div class='col-md-2'>"  + "</div>" +
                        "</div>";
    listBody += listContents;
  }
    this.$el.html(addKidButton + '<br>' + editChildButton + title + listBody);
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
    'click #clear' : 'clear',
    'click #submit' : 'saveKid',
    },

  clear: function(){
      document.getElementById("firstName").value = "";
      document.getElementById("midInit").value = "";
      document.getElementById("lastName").value = "";
  },

  saveKid: function(event) {
      //event.preventDefault() is called to allow the post request to give response
      event.preventDefault();
      var firstName = $('#firstName').val();
      var midInit = $('#midInit').val();
      var lastName = $('#lastName').val();
      var fullName = firstName + ' ' + midInit + ' ' + lastName;
      this.collection.create({kidFirstName: firstName, kidLastName: lastName, kidMidInitial: midInit, kidFullName: fullName, username: currentUser});
      document.getElementById("firstName").value = "";
      document.getElementById("midInit").value = "";
      document.getElementById("lastName").value = "";
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
                // "</form"> +
                "<div class='modal-footer'>" +
                "<button type='submit' class='btn btn-warning' id='submit'>Submit</button>" +
                "<button type='reset' class='btn btn-success' id='clear'>Clear</button>" +
                "<button type='button' class='btn btn-primary clear' data-dismiss='modal'>Nevermind</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
                self.$el.html($kidModal);
    },
});


///////////////////////////////////////////////
//////////////editKid View///////////////////
///////////////////////////////////////////////

var EditKidView = Backbone.View.extend({

initialize: function() {
    this.collection.on('update', this.render, this);
},

events: {
  "click #editBox" : "editInfo",
  "click #yesDelete" : "deleteInfo"
},

editInfo: function() {
  // if
},

deleteInfo: function() {
  console.log('box checked');


},


render: function() {
  var self = this;
  main.kidCollection.deferred.done(function() {
    var kids = main.kidCollection.pluck("kidFullName");
    var formBodyEdit = "";
    for (i = 0; i < kids.length; i++) {
    var contents = "<div class='row'>" +
                       "<div class='form-group col-md-6 col-md-offset-3'>" +
                       "<h4 class='kids'>" + kids[i] + "</h4>" +
                       "<div id=" + kids[i] + " class='input-group'>" +
                       "<label class='checkbox-inline' id='editBox[i]'><input type='checkbox' name=" + kids[i] + " value='Edit'>Edit</label>" +
                       "<label class='checkbox-inline'><input type='checkbox' name=" + kids[i] + " value='Delete'>Delete </label>" + "<br>" +
                       "<div class='row'>" +
                       "<div class='col-md-6 col-offset-4'>" +
                        "<input type ='text' name='firstName' id ='firstName' placeholder='Edit First Name'>" +
                       "<input type ='text' name='midInit' id ='midInit' placeholder='Edit MI'>" +
                       "<input type ='text' name='lastName' id ='lastName' placeholder='Edit Last Name'>" +
                       "</div>" +
                       "</div>" +
                       "</div>" +
                       "</div>" +
                       "</div>";
    formBodyEdit += contents;
    }

  //
    var editModal =

                "<div id='editModal' class='modal fade role='dialog'>" +
                "<div class='modal-dialog'>" +
                "<div class='modal-content'>" +
                "<div class='modal-header'>" +
                "<button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
                "<h4 class='modal-title'>Edit Child Information</h4>" +
                "</div>" +
                "<div class='modal-body'>" +
                "<div class='row'>" +
                "<div class='col-md-4 col-md-offset-4'>" +
                formBodyEdit +
                "</div>" +
                "</div>" +
                "<button id='saveBooking' class='btn btn-primary btn-md' type='submit'>Save Changes</button>" +
                "<button id='yesDelete' class='btn btn-danger btn-md' type='delete'>Delete Selected</button>" +
  //               "</div>" +
  //               "</div>" +
  //               // "</form>" +
  //               "</div>" +
  //               "<div class='modal-footer'>" +
  //               "<button type='button' class='btn btn-default clear' data-dismiss='modal'>Nevermind</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>"

                self.$el.html(editModal);
      })
    }

});
