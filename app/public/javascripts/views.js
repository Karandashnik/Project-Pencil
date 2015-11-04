
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
  }
});

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
                "<form id='' action='/month' method='post'><div class='row'><div class='form-group col-md-6 col-md-offset-3'>" +
                "<h1 class='form-signin-heading'>" + date + "</h1></div></div><div class='row'>" +
                "<div class='form-group col-md-6 col-md-offset-3'>" +
                "<label class='radio-inline'><input type='radio' name='optradio'>Before Care</label>" +
                "<label class='radio-inline'><input type='radio' name='optradio'>After Care</label>" +
                "<label class='radio-inline'><input type='radio' name='optradio'>Both</label>" +
                "</div></div></form>" +
                // <div class='row'>
                // <div class='form-group col-md-6 col-md-offset-3'> +
                //       <label for='inputEmail' class='sr-only'>Email address</label>
                //       <input type='email' id='inputEmail' class='form-control' placeholder='Email Address' required='' autofocus='' name='email'>
                //     </div>
                //   </div>
                //   <div class='row'>
                //     <div class='form-group col-md-6 col-md-offset-3'>
                //       <label for='inputEmail' class='sr-only'>Email address</label>
                //       <input type='email' id='inputEmail' class='form-control' placeholder='Email Address' required='' autofocus='' name='email'>
                //     </div>
                //   </div>
                //   <div class="row">
                //     <div class="form-group col-md-6 col-md-offset-3">
                //       <button class="btn btn-primary btn-lg btn-block" type="submit">Sign Up</button>
                //     </div>
                //   </div>
                // </form>
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
