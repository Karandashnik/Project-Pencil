///////////////////////////////////////////////
//////////////userKids View///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({
  events: {
    ".click #edit" : "edit",
    ".click #delete" : "deleteItem"
  },

  edit: function() {
    console.log('edit soon');
  },

  render: function() {
    var listBody = "";
    var kiddos = mainKids.kidCollection.pluck("kidFullName");
    console.log(kiddos);
    var title = "<h4 class='listTitle'>" + 'Registered Children' + "</h4>";
    var editButton = "<button class = 'btn btn-warning btn-xs' 'type = button'>" + 'Edit' + "</button>";
    for (i = 0; i <kiddos.length; i++) {
    var listContents =  "<div class='row'>" +
                        "<div class='col-md-4'>" +
                        "<ul class ='listOfKids'>" +
                        "<li class='oneKid'>" + kiddos[i] + "</li>" +
                        // "<li class='oneKid'>" + kiddos[i] + editButton + "</li>" +
                        // "<li class='edit'>" + editButton + "</li>" +
                        "</ul>" + "</div>" +
                        "<div class='col-md-2'>" + editButton + "</div>" +
                        "</div>"
    listBody += listContents;
  };
    this.$el.html(title + listBody);
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
    // this.collection.on('update', this.reset, this);
  },

  render: function() {
    var $form = $('<form>');
    var $firstName = $('<input type ="text" name="firstName" id ="firstName" placeholder="first name">');
    var $midInit = $('<input type ="text" name="midInit" id ="midInit" placeholder="MI">');
    var $lastName = $('<input type ="text" name="lastName" id ="lastName" placeholder="last name">');
    var $submit = $('<button type="submit" id="submit">Submit</button>');
    var $cancel = $('<button type="reset" id="cancel">Cancel</button>');
    $form.append([$firstName, $midInit, $lastName, $submit, $cancel]);
    this.$el.html($form);
  }

});
