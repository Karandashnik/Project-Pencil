var Calendar = function() {
	var wrap;
	var label;
	var months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
	var currDate = new Date();
	var currMonth =currDate.getMonth();
	var currYear = currDate.getFullYear();

	function init(newWrap) {
		$( document ).ready(function() {
		   switchMonth(null, currMonth, currYear);
		});


		wrap = $(newWrap || "#calendar");
		label = wrap.find("#label");

		// wrap.find("#curr").bind("click.calendar", function() {
		// switchMonth(null, newDate().getMonth(), new Date().getFullYear() );
		// });


		wrap.find("#prev").bind("click.calendar", function() {
		 switchMonth(false);
		});
		wrap.find("#next").bind("click.calendar", function() {
		 switchMonth(true);
		});
		//adds event listener to dayviews
		$('.container').on('click', '.dayView', function () {
			var day = event.target.id;
			var monthYear = label.text().trim().split(" ");
			var month = monthYear[0];
			var year = monthYear[1];
			var wholeDay = month + " " + day + ", " + year;
			var dayCollection = new DayCollection();
			var dayModel = new DayModel({id: wholeDay, day: day, month: month, year: year});
			var dayView = new DayView({model: dayModel, collection: dayCollection});
			dayView.render();
			$("#" + day).append(dayView.$el);
		});
		label.bind("click.calendar", function() {
		switchMonth(null, newDate().getMonth(), new Date().getFullYear() );
		});
	}

	function createDays() {
		for (var i = 0; i < weekdays.length; i++) {
			var dW = weekdays[i];
			var textnode = document.createTextNode(weekdays[i]);
			var td = document.createElement('td');
			td.setAttribute('class', "dOw"); //dOw for "day of week" 
			td.setAttribute('id', dW);
			td.appendChild(textnode);
			$("#weekdays").append(td);
			$("#td").append(weekdays[i]);
		}
	}

	// function dayNums() {
	// 		var numRows = 5;
	// 		var numCols = 7;
	// 	    for (var r=0, id=1; r<numRows; ++r) {
	//            	var tr = document.createElement('tr');
	//             $(".curr").append(tr);
	//            	for (var c=0; c<numCols; ++c, ++id) {
	//                 var td = document.createElement('td');
	//                 td.setAttribute('id', "OMG");
	//                 tr.appendChild(td);
	//             }
	//         }
	//
	// }

	function switchMonth(next, month, year) {

			var curr = label.text().trim().split(" ");  // replace this madness with moments.js //
			var calendar;
			var tempYear = parseInt(curr[1], 10);
			month = month || ((next) ? ((curr[0] === "December") ? 0 : months.indexOf(curr[0]) + 1) : ( (curr[0] === "January") ? 11 : months.indexOf(curr[0]) - 1) );
			year  = year  || ((next && month === 0) ? tempYear + 1 : (!next && month === 11) ? tempYear -1 : tempYear);
			calendar = createCal(year, month);

		$("#calGrid", wrap)
		.find(".curr")
			.removeClass("curr")
			.addClass("temp")
		.end()
		.prepend(calendar.calendar())
		.find(".temp")
			.hide("fast", function() { $(this).remove();});
		label.text(calendar.label);
	}

	function createCal(year, month) {
		var day = 1;
		var i;
		var j;
		var haveDays = true;
		var startDay = new Date(year, month, day).getDay(),
			daysInMonth = [31, (((year%4===0)&&(year%100!==0))||(year%400===0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ],
			calendar = [];
		if (createCal.cache[year]) {
			if(createCal.cache[year][month]) {
				return createCal.cache[year][month];
				}
			}
			else {
				createCal.cache[year]={};
			}
			i = 0;
			while(haveDays) {
				calendar[i] = [];
				for (j = 0; j < 7; j++) {
					if (i === 0) {
						if (j === startDay) {
							calendar[i][j] = day++;
							startDay++;
						}
					} else if ( day <= daysInMonth[month]) {
						calendar
						[i][j] = day++;
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
			//this function was created shared days if there were more than 5 weeks in a month

			// if (calendar[5]) {
			// 	for (i = 0; i < calendar[5].length; i++) {
			// 		if (calendar[5][i] !== "") {
			// 			calendar[4][i] = "<span>" + calendar[4][i] + "</span><span>" + calendar[5][i] + "</span>";
			// 		}
			// 	}
			// 	console.log("calendar before slice is " + calendar);
			// 	calendar = calendar.slice(0, 5);
			// 	console.log("calendar after slice is " + calendar);
			// }
			for (i = 0; i < calendar.length; i++) {
				var calendarHtml = "<tr>"
				for (j = 0; j < calendar[i].length; j++) {
					day = calendar[i][j];
					if (day === "" || day === undefined){
						var tdTag = "<td></td>"
						calendarHtml += tdTag;
					} else {
						var tdTag = "<td id=" + day + " class=dayView data-toggle=modal data-target=#bookingModal>" + day + "</td>";
						calendarHtml += tdTag;
					}
				}
				calendarHtml += "</tr>";
				calendar[i] = calendarHtml;
			}

			calendar = $("<table>" + calendar.join("") + "</table").addClass("curr");

			$("td:empty", calendar).addClass("nil");
			if (month === new Date().getMonth()) {
				$('td', calendar).filter(function () { return $(this).text() === new Date().getDate().toString(); }).addClass("today");
			}

			createCal.cache[year][month] = { calendar : function () { return calendar.clone(); }, label : months[month] + " " + year };
			console.log("createCal.cache[year][month] is " + createCal.cache[year][month]);
			return createCal.cache[year][month];
		}

		createCal.cache = {};


		return {
			init: init,
			createDays: createDays,
			//dayNums: dayNums,
			switchMonth: switchMonth,
			createCal: createCal
			};
};
