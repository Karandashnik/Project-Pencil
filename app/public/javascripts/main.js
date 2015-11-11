var main = {};
$(function() { //when DOM is ready...
  //create kid stuff
  main.kidCollection = new KidCollection();
  main.addKidView = new AddKidView({collection: main.kidCollection});
  main.addKidView.render();
  $("#kidList").append(main.addKidView.$el);
  main.userKidsView = new UserKidsView({collection: main.kidCollection});
  main.userKidsView.render();
 $("#kidList").append(main.userKidsView.$el);
 main.editKidView = new EditKidView({collection: main.kidCollection});
 main.editKidView.render();
 $("#kidList").append(main.editKidView.$el);

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
