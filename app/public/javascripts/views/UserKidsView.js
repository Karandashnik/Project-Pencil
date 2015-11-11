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
    "click #addKid" : "createAddKidView"
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