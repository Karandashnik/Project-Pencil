var GUI = (function() {
	
var DatePickerView = Backbone.View.extend({
	
	render: function() {
		calendarPop: function() {
		//jQuery plugin- I put inside method "calendarPop"//
			$function(){
			  $( "#from" ).datepicker({
		      defaultDate: "+1w",
		      changeMonth: true,
		      numberOfMonths: 1,
		      onClose: function( selectedDate ) {
		      $( "#to" ).datepicker( "option", "minDate", selectedDate );
		      }
		    });
		    $( "#to" ).datepicker({
			  defaultDate: "+1w",
			  changeMonth: true,
			  numberOfMonths: 3,
			  onClose: function( selectedDate ) {
			  $( "#from" ).datepicker( "option", "maxDate", selectedDate );
		   	  }
		   	});
			console.log('testing render process');
			var $form = $('<form>')// I'm adding this to the jQuery//
			var $fromLabel =$('<label for="from">From</label>');
			var $fromInput =$('<input type="text" id="from" name="from">');
			var $toLabel=$('<label for="to">to</label>');
			var $toInput=$('<input type="text" id="to" name="to">');
			$form.append($[fromLabel, $fromInput, $toLabel, $toInput] )
			this.$el.hbs($form);  //hbs instead of html//	
			},
		});

	intialize: function() {
		$('#altBookDiv').append(this.$el);
		this.listenTo(app.calendarPop);
		console.log('checkingConnection');
		},


	events:  {
		'click #from'  : 'datepicker',
		'click #to' : 'datepicker',  //not sure what should go here.
	},
	
	newBooking: function() {
		("#datepicker").datepicker('getDate');
		$("#datepicker").datepicker({onSelect: function(dateText, inst)
		{var dateAsString = dateText;}

		})	
		},

});

return GUI;
}())
