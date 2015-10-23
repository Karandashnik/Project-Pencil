var GUI = (function() {

var AddSingleDayView = Backbone.View.extend({
	
	render: function() {
	var $form = $('<form>');  //to contain everything
	var $day = $('new Date()'); // but this gives today's date-- we want the clicked date.
	var $singleDay = $('day.getDate()');
	var $addBooking = $('<select id ="dropdown">'); // when clicking on date, a dropdown as to which service opens//
	var $addName = $('<input type ="text" name="" id="name" placeholder="name">');  //to add who booking is for.
	console.log(singleDay);  //returns something in "number" form.
	$form.append($singleDay, $addBooking, $addName)
	$this.$el.html($form);
	},

	initialize: function() {
	$('#calendar').append(this.$el);
	},

	events: {
		'click #beforeCare' : 'addBooking',
		'click #afterCare' : 'addBooking',
		'click #both' : 'addBooking',
		'keypress input' : 'deleteBooking'

	},

	//to get the dropdown choice into a variable that we can send to database//
	addBooking: function(dropdownChoice) {
		console.log('test addEvent');
		var booking = ;
		if(dropdownChoice == #beforeCare) {
			var booking = addBeforeCare;	
		}
		else if (dropdownChoice == #afterCare) {
			var booking = addAfterCare;
		}
		else if (dropdownChoice == #both) {
			var booking = addBoth;
		}
		console.log(booking);
	},

	deleteBooking: function(d) {
		if(d.keyCode == 46) {
			this.remove();
		}
	}




å});


});

