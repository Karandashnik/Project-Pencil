var config = require('./config.js');
var orch = require('orchestrate');
var routes = require('./routes/index');
var db = orch(config.dbKey);

var october = new DayCollection({numDays: 31, month: "october"});
var dayModel = new DayModel();
var dayView = new DayView({model: dayModel, collection: october});
october.add(dayModel);
dayView.render();
$('#calendar').append(dayView.$el);
