var main = {};
$(function() { //when DOM is ready...
  //create kid stuff
  main.kidCollection = new KidCollection();
  main.addKidView = new AddKidView({collection: main.kidCollection});
  main.addKidView.render();
  $("#kidList").append(main.addKidView.$el);
  //create booking stuff
  main.bookingCollection = new BookingCollection();
  main.usersBookingView = new UsersBookingView({collection: main.bookingCollection});
  main.usersBookingView.render()
;  $("#upcomingBookings").append(main.usersBookingView.$el);
  //create day stuff
  main.dayCollection = new DayCollection();
});
