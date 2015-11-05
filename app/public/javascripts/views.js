///////////////////////////////////////
///////////CALENDAR VIEWS//////////////
///////////////////////////////////////
var DayView = Backbone.View.extend({
  initialize: function() {
    //Listen for events being added to the day
    this.listenTo(this.collection, "add", this.render);
    //this.listenTo($("td"), "click", this.render);
  },

  update: function(newBooking) {
    //this.model.set("bookings"[0], newBooking);
  },
  render: function() {
    console.log("DayView is rendering");
    var day = this.model.get("day");
    var month = this.model.get("month");
    var year = this.model.get("year");
    var user = currentUser;
    var wholeDay = month + " " + day + ", " + year;
    var bookingCollection = new BookingCollection();
    var bookingModel = new BookingModel({date: wholeDay, user: user})
    var createBookingView = new CreateBookingView({model: bookingModel, collection: bookingCollection});
    createBookingView.render();
    $("#calendar").append(createBookingView.$el);
    // var html = "<div class='modal fade' role='dialog'><h2>Day "+this.model.attributes.date+"</h2><p>Your bookings: </p><br><ul>";
    // this.model.attributes.bookings.forEach(function(booking) {
    //   html += "<li>"+booking.attributes.title+"</li>"
    // });
    // html += "</ul></div>"
    // this.$el.append(html);
  }
});
//Create a model for each day, and a view and collection for each model
//This doesn't work, since you can't call .forEach after a document.getElementsByTagName().
// var allDays = document.getElementsByTagName("td");
// allDays.forEach(function(td){
//   var dayModel = new DayModel({id: td.innerHTML});
//   var dayView = new DayView({model: dayModel});
//   var bookingCollection = new BookingCollection({});
// });

//previous DayView, don't want to delete yet
// var DayView = Backbone.View.extend({
//   initialize: function() {
//     this.listenTo(this.collection, 'add', this.saveNewModel);
//   },
//   saveNewModel: function(newModel) {
//     console.log("Saving", newModel);
//     newModel.save();
//   },
//   render: function() {
//     this.$el.html("<p>"+this.dateMonth+ " "+this.dateDay+", "+this.dateYear);
//   }
// })

///////////////////////////////////////////////
////////////////BOOKING VIEW///////////////////
///////////////////////////////////////////////

var CreateBookingView = Backbone.View.extend({
  render: function(){
    var date = "This day is " + this.model.get("date");
    var user = " and the user is " + this.model.get("user");
    var modal = "<div id='bookingModal' class='modal fade' role='dialog'><div class='modal-dialog'>" +
                "<div class='modal-content'><div class='modal-header'><button type='button' class='close clear' data-dismiss='modal'>&times;</button>" +
                "<h4 class='modal-title'>Make Appointment</h4></div><div class='modal-body'></div>" +
                "<div>" + date + user + "</div>" +
                "<div class='modal-footer'><button type='button' class='btn btn-default clear' data-dismiss='modal'>Nevermind</button></div></div></div></div>"
    this.$el.html(modal);
  },
  initialize: function(){

  },
  events: {
      "click .clear" : "clear"
  },
  clear: function(){
    this.model.clear();
    this.$el.html("");
  }
})

var BookingView = Backbone.View.extend({
  render: function() {

  },
  initialize: function() {

  }

});
///////////////////////////////////////////////
//////////////DASHBOARD VIEW///////////////////
///////////////////////////////////////////////
var DashboardView = Backbone.View.extend({
  render: function() {

  },
  initialize: function() {

  }
});

///////////////////////////////////////
///////////KID VIEWS//////////////
///////////////////////////////////////
var KidView = Backbone.View.extend({
  tagName: 'li',

  template: _.template(addKidTemplate),

  events: {

    //Click submit: send form//
    //Click cancel: close window, clear form// (destroy?)
    //Click addChild: send form then reset to new child//
  }

  initialize: function() {
    this.listenTo(this.collection, "add", this.render);
    this.lsitenTo(this.model 'destroy', this.remove);
  },

  render: function(){
    console.log("KidView is rendering");
    var kidFirstName = this.model.get("kidFirstName");
    var kidMidInitial = this.model.get("kidMidInitial");
    var kidLastName = this.model.get("kidLastName");
    var kidFullName = kidFirstName + " " + kidMidInitial + " " + kidLastName;
    var kidCollection = new KidsCollection();
    var kidsModel = new KidsModel({addedKids: kidFullName});
    var addedKidView = new addKidView({model: KidsModel, collection: KidsCollection});
    addedKidView.render();
    $("#kidList").append(createKidView.$el);
    //ADD KIDFULLNAME to KIDS ARRAY {};
  }
});
