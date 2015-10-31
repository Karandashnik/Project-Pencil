var october = new DayCollection({numDays: 31, month: "october"});
var dayModel = new DayModel();
var dayView = new DayView({model: dayModel, collection: october});
october.add(dayModel);
dayView.render();
//$('#calendar').append(dayView.$el);
