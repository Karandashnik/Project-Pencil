var KidCollection = require('./collections/KidCollection.js'),
    BookingCollection = require('./collections/BookingCollection.js'),
    CalendarDayCollection = require('./collections/CalendarDayCollection.js'),
    AddKidView = require('./views/AddKidView.js'),
    UserKidsView = require('./views/UserKidsView.js'),
    UsersBookingView = require('./views/UserBookingView.js'),
    CalendarDayView = require('./views/CalendarDayView.js'),
    Calendar = require('./calendar.js');

var main = {};

window.Calendar = Calendar;

$(function () { //when DOM is ready...


  //create kid stuff
  main.kidCollection = new KidCollection();
  main.addKidView = new AddKidView({collection: main.kidCollection});
  main.addKidView.render();
  $("#kidList").append(main.addKidView.$el);

  main.userKidsView = new UserKidsView({collection: main.kidCollection});
  main.userKidsView.render();
  $("#kidList").append(main.userKidsView.$el);

  //create booking stuff
  main.bookingCollection = new BookingCollection();
  main.usersBookingView = new UsersBookingView({collection: main.bookingCollection});
  main.usersBookingView.render();
  $("#upcomingBookings").append(main.usersBookingView.$el);

  //create day stuff
  main.calendarDayCollection = new CalendarDayCollection();
  main.calendarDayView = new CalendarDayView({collection: main.calendarDayCollection});
  main.calendarDayView.render();
});
