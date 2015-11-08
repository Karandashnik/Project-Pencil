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

var UserKidsView = Backbone.View.extend({

  render: function() {
    // var listOfKids = $('<ul>');
    // var regKids
  },
  events: function() {

  },


});
