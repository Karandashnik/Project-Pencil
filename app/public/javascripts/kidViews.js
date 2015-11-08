///////////////////////////////////////////////
//////////////userKids View///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({

  render: function() {
    var listBody = "";
    var kiddos = mainKids.kidCollection.pluck("kidFullName");
    console.log(kiddos);
    var title = "<h4 class='listTitle'>" + 'Registered Children' + "</h4>"
    for (i = 0; i <kiddos.length; i++) {
    var listContents =  "<div class='row'>" +
                        "<div class='col-md-6 col-md-offset-3'>" +
                        "<ul class ='listOfKids'>" +
                        "<li class='oneKid'>" + kiddos[i] + "</li>" +
                        "</ul>" +
                        "</div>" +
                        "</div>"
    listBody += listContents;
  }
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
      //add function to clear the form//
    //  this.render();
      // console.log(newKid.get("username"));
      // console.log(firstName);
  },

  deleteIt: function() {
    this.clear();
  },



  initialize: function() {
    //console.log('testing bananas');
  },

  render: function() {
    var $form = $('<form>');
    var $firstName = $('<input type ="text" name="firstName" id ="firstName" placeholder="first name">');
    var $midInit = $('<input type ="text" name="midInit" id ="midInit" placeholder="MI">');
    var $lastName = $('<input type ="text" name="lastName" id ="lastName" placeholder="last name">');
    var $submit = $('<button id="submit">Submit</button>');
    var $cancel = $('<button id="cancel">Cancel</button>');
    $form.append([$firstName, $midInit, $lastName, $submit, $cancel]);
    this.$el.html($form);
  }

});
