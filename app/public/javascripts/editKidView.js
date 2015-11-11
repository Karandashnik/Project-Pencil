///////////////////////////////////////////////
//////////////editKid View///////////////////
///////////////////////////////////////////////
var EditKidView = Backbone.View.extend({



})







var kids = main.kidCollection.findWhere("kidFullName");
var listUserKids = "";
for (var i = 0; i < kids.length; i++) {
  console.log(kids[i]);

}
