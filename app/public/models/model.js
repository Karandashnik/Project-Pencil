// var AltDateModel = Backbone.Model.extend({
// 	defaults: function() {
// 		return {
// 		console.log('test2'),
// 		//some defaults here//
// 		}	
// 	});

var dashBoardModel = Backbone.Model.extend({
	defaults: {
		name: 'friend',
	}

});

var SingleDayModel = Backbone.Model.extend({
	defaults: {
		day: '',
		dayOfWeek: '',
		busy: false,
		},
});



// var AltDateCollection = Backbone.Collection.extend({
// 	model:AltDateModel,
// 	localStorage: new Backbone.localStorage("testing1")
// });

var SingleDayCollection = Backbone.Collection.extend({
	model: SingleDayModel,
	localStorage: new Backbone.localStorage("testing2")
});


var someBooking = new SingleDayCollection();



