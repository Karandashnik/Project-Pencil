///////////////////////////////////////////////
//////////////userKids View///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add", this.render);
    this.listenTo(this.collection, "remove", this.render);
    this.listenTo(this.collection, "change", this.render);

  },

  events: {
    "click .editKid" : "editKid",
    "click #addKid" : "createAddKidView",
  },

  editKid: function(event) {
    var changeKid = event.target.id;
    //console.log(changeKid);
    //console.log(this.collection);
    var editKidModel = this.collection.findWhere({kidFirstName: changeKid});
    //console.log(editKidModel);
    var editKidView = new EditKidView({collection: main.kidCollection, model: editKidModel});
    //console.log(editKidModel);
    editKidView.render();
    $('#kidList').append(editKidView.$el);
  },

  createAddKidView: function() {
     addKidView = new AddKidView({collection: main.kidCollection});
     addKidView.render();
     $('#kidList').append(addKidView.$el);
  },

  render: function() {
    // var self = this;
    var addKidButton = '<button class = "addKidView btn btn-warning btn-lg" id="addKid" data-toggle="modal" data-target="#kidModal">Add Child</button>';

    var kiddos = this.collection.pluck("kidFullName");
    console.log(kiddos);
    var title = "<h4 class='listTitle'>" + 'Registered Children' + "</h4>";
    var listBody = "";
    for (var i = 0; i < kiddos.length; i++) {

    var listContents =
                     "<div class= 'col-xs-6 col-md-3 oneKid' + id="+kiddos[i] +" >" + kiddos[i]  +
                     "<button type='button' class='btn btn-xs btn-info editKid' data-toggle='modal' data-target='#editKidModal' id="+kiddos[i] +"</button>" +
                     "</div>" +
                     "</div>";
                     listBody += listContents;
  }
    this.$el.html(addKidButton + '<br>' +  title + listBody);

  }



});

///////////////////////////////////////////////
//////////////addKid View///////////////////
///////////////////////////////////////////////

var AddKidView = Backbone.View.extend({

  events: {
    'click #clearAddKid' : 'clearAddKid',
    'click #submit' : 'saveKid',
    },

  clearAddKid: function(){
      document.getElementById("firstName").value = "";
      document.getElementById("midInit").value = "";
      document.getElementById("lastName").value = "";
  },

  saveKid: function(event) {
      // is called to allow the post request to give response
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
                "<button type='submit' class='btn btn-warning' id='submit'>Submit</button>" +
                "<button type='reset' class='btn btn-success' id='clearAddKid'>Clear</button>" +
                "<button type='button' class='btn btn-primary clear' data-dismiss='modal'>Nevermind</button>" +
                "</div>" +
                "</div>" +
                "</div>" +
                "</div>";
                this.$el.html($kidModal);
    },
});


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
  event.preventDefault();
  var firstName = $('#editFirstName').val();
  var midInit = $('#editMidInit').val();
  var lastName = $('#editLastName').val();
  var fullName = firstName + ' ' + midInit + ' ' + lastName;
  this.model.set("kidFirstName", firstName);
  this.model.set("kidMidInitial", midInit);
  this.model.set("kidLastName", lastName);
  this.model.set("kidFullName", fullName);
  console.log(this.model);
  this.model.save();
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
