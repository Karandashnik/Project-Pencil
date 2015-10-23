var GUI = (function() {

var AddSingleDayView = Backbone.View.extend({
	
	render: function() {
	var $cell = $()
	var $day = $('new Date()');
	var $singleDay = $('day.getDate()');
	var $addBooking = //a dropdown menu
	console.log(singleDay);  //retunrs something in "number" form.
	$this.$el.html($singleDay, $addBooking);
	},

	initialize: function() {
	$('#calendar').append(this.$el);
	},

	events: {

	},

	addBooking: function() {
		console.log('test addEvent');
	},




å});


});

