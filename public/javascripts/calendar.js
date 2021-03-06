
var CalendarMonthView = Backbone.View.extend({

  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

	weekdays: ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"],

	calendarContents: {},

	render: function() {
		var currMonth = new Date().getMonth();
		var currYear = new Date().getFullYear();
		this.createCalHeader();
		this.createDays();
		var self = this;
		$( document ).ready(function() {
			self.determineMonth(null, currMonth, currYear);
		});
	},

	createCalHeader: function () {
		var wrap = $("#calendar");
		var self = this;
		wrap.find("#prev").bind("click.calendar", function() {
			self.collection.reset();
		  self.determineMonth(false);
		});
		wrap.find("#next").bind("click.calendar", function() {
			self.collection.reset();
		  self.determineMonth(true);
		});
		$('#calendar').on('click', '.dayView', function(event) {
			var id = event.target.id;
			var yearMonthDay = id.split("-");
			var year = yearMonthDay[0];
			var month = yearMonthDay[1];
			var day = yearMonthDay[2];
			var date = new Date(year, month, day);
			var bookingModel = new BookingModel({date: date, dateId: id, user: currentUser})
			var createBookingView = new CreateBookingView({collection: main.bookingCollection, model: bookingModel});
			createBookingView.render();
			$("#calendar").append(createBookingView.$el);
		});
	},

	createDays: function() {
		for (var i = 0; i < this.weekdays.length; i++) {
			var dW = this.weekdays[i];
			var textnode = document.createTextNode(dW);
			var td = document.createElement('td');
			td.setAttribute('class', "dOw"); //dOw for "day of week"
			td.setAttribute('id', dW);
			td.appendChild(textnode);
			$("#weekdays").append(td);
			$("#td").append(dW);
		}
	},

	initialize: function() {

	},

	determineMonth: function(next, month, year) {
		var wrap = $("#calendar");
		var label = wrap.find("#label");
		var curr = label.text().trim().split(" ");  // replace this madness with moments.js //
		var tempYear = parseInt(curr[1], 10);
		if (month !== 0) {
			var month = month || ((next) ? ((curr[0] === "December") ? 0 : this.months.indexOf(curr[0]) + 1) : ( (curr[0] === "January") ? 11 : this.months.indexOf(curr[0]) - 1) );
		} else {
			var month = 0;
		}
		var year  = year  || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear -1 : tempYear);
		var calendar = this.createCal(year, month);
		$("#calGrid", wrap)
		.find(".curr")
			.removeClass("curr")
			.addClass("temp")
		.end()
		.prepend(calendar.calendar())
		.find(".temp")
			.hide("fast", function() { $(this).remove();});
		label.text(calendar.label);
		this.collection.add({month: month, year: year});
		console.log("just appended calendar");
	},

	createCal: function(year, month) {
		console.log("started creating calendar");
		var day = 1;
		var haveDays = true;
		var startDay = new Date(year, month, day).getDay(),
			daysInMonth = [31, (((year%4===0)&&(year%100!==0))||(year%400===0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
			calendar = [];
		// if (createCal.cache[year]) {
		// 	if(createCal.cache[year][month]) {
		// 		return createCal.cache[year][month];
		// 		}
		// 	}
		// 	else {
		// 		createCal.cache[year]={};
		// 	}
			var i = 0;
			while(haveDays) {
				calendar[i] = [];
				for (var j = 0; j < 7; j++) {
					if (i === 0) {
						if (j === startDay) {
							calendar[i][j] = day++;
							startDay++;
						}
					} else if ( day <= daysInMonth[month]) {
						calendar[i][j] = day++;
					} else {
						calendar[i][j] = "";
						haveDays = false;
					}
					if (day > daysInMonth[month]) {
						haveDays = false;
					}
				}
				i++;
			}
			for (i = 0; i < calendar.length; i++) {
				var calendarHtml = "<tr>"
				for (j = 0; j < calendar[i].length; j++) {
					day = calendar[i][j];
					if (day === "" || day === undefined){
						var tdTag = "<td></td>"
						calendarHtml += tdTag;
					} else {
						var today = new Date().setHours(0,0,0,0);
						var calendarDay = new Date(year, month, day);
						var dayIndex = calendarDay.getDay();
						var dateId = year + "-" + month + "-" + day;
						//if day has passed or day is Saturday or Sunday, give that td element the blockout class and do not add functionality to add an appointment//
						if (calendarDay < today || (dayIndex === 0 || dayIndex === 6)) {
						  var tdTag = "<td id=" + dateId + " class='blockOut dayDiv'>" + day + "</td>";
						} else {
							var tdTag = "<td id=" + dateId + " class='dayView dayDiv' data-toggle='modal' data-target='#bookingModal'>" + day + "</td>";
						}
						calendarHtml += tdTag;
					}
				}
				calendarHtml += "</tr>";
				calendar[i] = calendarHtml;
			}

			calendar = $("<table>" + calendar.join("") + "</table").addClass("curr");

			$("td:empty", calendar).addClass("nil");
			if (month === new Date().getMonth()) {
				$('td', calendar).filter(function () {
					return $(this).text() === new Date().getDate().toString();
				}).addClass("today");
			}
			return this.calendarContents = { calendar : function () { return calendar.clone(); }, label : this.months[month] + " " + year };
			console.log("done creating calendar");
	}
})
//
// var Calendar = function() {
// 	console.log('1');
// 	var wrap;
// 	var label;
// 	var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// 	var weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
// 	var currDate = new Date();
// 	var currMonth =currDate.getMonth();
// 	var currYear = currDate.getFullYear();
//
//
// 	function init() {
// 		$( document ).ready(function() {
// 			console.log('2');
// 		   switchMonth(null, currMonth, currYear);
// 		});
// console.log('3');
// 		wrap = $("#calendar");
// 		label = wrap.find("#label");
//
// 		wrap.find("#prev").bind("click.calendar", function() {
// 		 switchMonth(false);
// 		});
// 		wrap.find("#next").bind("click.calendar", function() {
// 		 switchMonth(true);
// 		});
// 		//adds event listener to dayviews so modal pops up to create booking
//
// 		$('#calendar').on('click', '.dayView', function(event) {
// 				var id = event.target.id;
// 				var yearMonthDay = id.split("-");
// 				var year = yearMonthDay[0];
// 				var month = yearMonthDay[1];
// 				var day = yearMonthDay[2];
// 				var date = new Date(year, month, day);
// 				var bookingModel = new BookingModel({date: date, dateId: id, user: currentUser})
// 				var createBookingView = new CreateBookingView({collection: main.bookingCollection, model: bookingModel});
// 				createBookingView.render();
// 				$("#calendar").append(createBookingView.$el);
// 			});
// 	}
//
// 	function createDays() {
// 		console.log('5');
// 		for (var i = 0; i < weekdays.length; i++) {
// 			var dW = weekdays[i];
// 			var textnode = document.createTextNode(weekdays[i]);
// 			var td = document.createElement('td');
// 			td.setAttribute('class', "dOw"); //dOw for "day of week"
// 			td.setAttribute('id', dW);
// 			td.appendChild(textnode);
// 			$("#weekdays").append(td);
// 			$("#td").append(weekdays[i]);
// 		}
// 	}
//
// 	function switchMonth(next, month, year) {
// 			var curr = label.text().trim().split(" ");  // replace this madness with moments.js //
// 			var calendar;
// 			var tempYear = parseInt(curr[1], 10);
// 			month = month || ((next) ? ((curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1) );
// 			year  = year  || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear -1 : tempYear);
// 			calendar = createCal(year, month);
//
// 		$("#calGrid", wrap)
// 		.find(".curr")
// 			.removeClass("curr")
// 			.addClass("temp")
// 		.end()
// 		.prepend(calendar.calendar())
// 		.find(".temp")
// 			.hide("fast", function() { $(this).remove();});
// 		label.text(calendar.label);
// 	}
//
// 	function createCal(year, month) {
// 		console.log('7');
// 		var day = 1;
// 		var haveDays = true;
// 		var startDay = new Date(year, month, day).getDay(),
// 			daysInMonth = [31, (((year%4===0)&&(year%100!==0))||(year%400===0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
// 			calendar = [];
// 		if (createCal.cache[year]) {
// 			if(createCal.cache[year][month]) {
// 				return createCal.cache[year][month];
// 				}
// 			}
// 			else {
// 				createCal.cache[year]={};
// 			}
// 			var i = 0;
// 			while(haveDays) {
// 				calendar[i] = [];
// 				for (var j = 0; j < 7; j++) {
// 					if (i === 0) {
// 						if (j === startDay) {
// 							calendar[i][j] = day++;
// 							startDay++;
// 						}
// 					} else if ( day <= daysInMonth[month]) {
// 						calendar[i][j] = day++;
// 					} else {
// 						calendar[i][j] = "";
// 						haveDays = false;
// 					}
// 					if (day > daysInMonth[month]) {
// 						haveDays = false;
// 					}
// 				}
// 				i++;
// 			}
// 			for (i = 0; i < calendar.length; i++) {
// 				var calendarHtml = "<tr>"
// 				for (j = 0; j < calendar[i].length; j++) {
// 					day = calendar[i][j];
// 					if (day === "" || day === undefined){
// 						var tdTag = "<td></td>"
// 						calendarHtml += tdTag;
// 					} else {
// 						var today = new Date().setHours(0,0,0,0);
// 						var calendarDay = new Date(year, month, day);
// 						var dayIndex = calendarDay.getDay();
// 						var dateId = year + "-" + month + "-" + day;
// 						//if day has passed or day is Saturday or Sunday, give that td element the blockout class and do not add functionality to add an appointment//
// 						if (calendarDay < today || (dayIndex === 0 || dayIndex === 6)) {
// 						  var tdTag = "<td id=" + dateId + " class='blockOut dayDiv'>" + day + "</td>";
// 						} else {
// 							var tdTag = "<td id=" + dateId + " class='dayView dayDiv' data-toggle='modal' data-target='#bookingModal'>" + day + "</td>";
// 						}
// 						calendarHtml += tdTag;
// 					}
// 				}
// 				calendarHtml += "</tr>";
// 				calendar[i] = calendarHtml;
// 			}
//
// 			calendar = $("<table>" + calendar.join("") + "</table").addClass("curr");
//
// 			$("td:empty", calendar).addClass("nil");
// 			if (month === new Date().getMonth()) {
// 				$('td', calendar).filter(function () {
// 					return $(this).text() === new Date().getDate().toString();
// 				}).addClass("today");
// 			}
// 			createCal.cache[year][month] = { calendar : function () { return calendar.clone(); }, label : months[month] + " " + year };
// 			return createCal.cache[year][month];
// 		}
// 		createCal.cache = {};
// 		console.log(createCal.cache);
//
//
// 		return {
// 			init: init,
// 			createDays: createDays,
// 			switchMonth: switchMonth,
// 			createCal: createCal
// 			};
// };
