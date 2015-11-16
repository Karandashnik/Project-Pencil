///////////////////////////////////////////////
//////////////UserKidsView///////////////////
///////////////////////////////////////////////
var UserKidsView = Backbone.View.extend({
  initialize: function() {
  //  this.listenTo(this.collection, "add", this.listenToModel);
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
    var addKidButton = "<button class='addKidView btn btn-lg' id='addKid' data-toggle='modal' data-target='#kidModal'>Add Child</button>";
    var kiddos = this.collection.pluck("kidFullName");
    var kiddoF = this.collection.pluck("kidFirstName");
    var title = "<h3 class='listTitle'>" + 'Registered Children' + "</h3>";
    var listBody = "";
    var styleListOpen = "<div class='list-group'>";
    var styleListClose = "</div>";
    for (var i = 0; i < kiddos.length; i++) {
      var editKidButton = "<button class='editKidBtn btn btn-xs editKid' id=" + kiddoF[i] + " data-toggle='modal' data-target='#editKidModal'>Edit</button>";
      var listContents = "<li class='list-group-item oneKid'>" + kiddos[i] + editKidButton + "</li>";
      listBody += listContents;
    }
    this.$el.html(title + styleListOpen + listBody + styleListClose + addKidButton);

  }
});
