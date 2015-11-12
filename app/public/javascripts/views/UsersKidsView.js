///////////////////////////////////////////////
//////////////UserKidsView///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({
  initialize: function() {
    this.listenTo(this.collection, "add", this.listenToModel);
    this.listenTo(this.collection, "update", this.render);
  },

  listenToModel: function(newModel) {
    this.listenTo(newModel, "sync", function(model) {
      this.render();
    });
  },

  events: {
    "click .editKid" : "editKid",
    "click #addKid" : "createAddKidView"
  },

  editKid: function(event) {
    var changeKid = event.target.id;
    var editKidModel = this.collection.findWhere({kidFirstName: changeKid});
    var editKidView = new EditKidView({collection: this.collection, model: editKidModel});
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
    var kiddos = this.collection.pluck("kidFullName");
    var title = "<h4 class='listTitle'>" + 'Registered Children' + "</h4>";
    var listBody = "";
    for (var i = 0; i < kiddos.length; i++) {
      var listContents =
        "<div class= 'oneKid' id=" + kiddos[i] + ">" + kiddos[i] +
        "<button type='button' class='btn btn-xs btn-info editKid' data-toggle='modal' data-target='#editKidModal' id=" + kiddos[i] + ">Edit</button>" +
        "</div>" +
        "</div>";
      listBody += listContents;
    }
    this.$el.html(addKidButton + '<br>' +  title + listBody);

  }
});
