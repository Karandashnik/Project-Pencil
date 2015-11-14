var main = {};
$(function() { //when DOM is ready...
  var calendar = Calendar();
  calendar.init();
  calendar.createDays();
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
