var mainKids = {};
$(function() { //when DOM is ready...
  mainKids.kidCollection = new KidCollection();
  mainKids.kidModel = new KidModel();
  mainKids.addKidView = new AddKidView({collection: mainKids.kidCollection, model: mainKids.kidModel});
  mainKids.addKidView.render();
  $("#kidList").append(mainKids.addKidView.$el);
});
