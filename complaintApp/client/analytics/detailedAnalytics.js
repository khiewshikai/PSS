
Template.detailedAnalytics.onRendered(function(){

    var time = $("#time-interval").val();
    var dateStart = "";
    var dateEnd = "";
    var tickFormat = "";
    var xFormat = "";
    var xAxisLabel = "";

    function getFormatDate(date){
        var day = date.getDate();
        var month = date.getMonth() + 1;
        if(day < 10){
            day = "0" + day;
        }

        if(month < 10){
            month = "0" + month;
        }
        
        var year = date.getFullYear();
        var finalDate = year + "-" + month + "-" + day;
        return finalDate;
    }

    function addDays(currentDate, days) {
       var dat = new Date(currentDate)
       dat.setDate(dat.getDate() + days);
       return dat;
   }

   function getDates(startDate, stopDate) {
      var dateArray = ['x'];
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        console.log(currentDate);
        dateArray.push(currentDate)
        currentDate = addDays(currentDate, 1);
        console.log(currentDate);
        currentDate = getFormatDate(currentDate);
        console.log(currentDate);
      }

      dateArray.push(stopDate);
      return dateArray;
    }

    function randomizedData(title, number, minimum, maximum){
        var numberArr = [title];

        for (var i = 0; i < number; i++) {
            var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
            numberArr.push(randomnumber);
        };

        return numberArr;
    }

    function getPastWeekComplaints(){
        var totalComplaints = ['Total Number of Complaints'];            

        for (i = 6; i >= 1 ; i--) {
            var complaints = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-(i+1))), "$lte": new Date(new Date().setDate(new Date().getDate()-i))}}).count();
            totalComplaints.push(complaints);
        }
        
        var noOfComplaintToday  = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-1)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();           
        totalComplaints.push(noOfComplaintToday);
        
        console.log(totalComplaints);
        
        return totalComplaints;
    }
	
	function getComplaintsPerCategory(){
		var allComplaints = complaintsCollection.find().fetch()
		var resultList = {};

		//fetching results into HM
		allComplaints.forEach(function(complaintObj){
			var complaintCategory = complaintObj.productCategory;
			if(complaintCategory in resultList == false){
				var count = 1;
				resultList[complaintCategory] = {count: count};
			}else{
				var count = resultList[complaintCategory].count +1;
				resultList[complaintCategory].count = count;
			}
		});

		//converting HM to arr
		var resultListArr = [];
		for(result in resultList){
			var arr = [result, resultList[result].count];
			resultListArr.push(arr);
		}

		//sorting from top to bottom
		resultListArr.sort(function(a,b){
			return b[1] - a[1];
		});

		/*var catTitle = ["x"];
		var NumPerCatData = ['Total Number of Complaints Per Category'];
		resultListArr.forEach(function(a){
			catTitle.push(a[0]);
			NumPerCatData.push(a[1]);
		});*/

		return resultListArr;
	}

    function createGraph(title, dateStart, dateEnd, tickFormat, xFormat, xAxisLabel){
        console.log("createGraph");
        var min = 100;
        var max = 400;
        var dates = getDates(dateStart, dateEnd);
        var values = "";
		var type = "timeseries";
		
        if (title === "Number of Complaints"){
            values = getPastWeekComplaints();
        } else if (title === "Number of Complaints per Category"){
			var catResults = getComplaintsPerCategory();
			var catTitle = ["x"];
			var numPerCatData = ['Total Number of Complaints Per Category'];
			catResults.forEach(function(a){
				catTitle.push(a[0]);
				numPerCatData.push(a[1]);
			});
			dates = catTitle;
			values = numPerCatData;
			type = "category";
			xAxisLabel = "Category"
		} else {
            values = randomizedData(title, dates.length-1, min, max);
        }
         
        var graph = c3.generate({
            bindto: '#analytics-space',
            data: {
                x: 'x',
                xFormat: xFormat,
                columns: [
                    dates, values
                ],
                type: 'bar',
            },
            axis: {
                x: {
                    type: type,
                    label: {
                        text: xAxisLabel,
                        position: 'outer-right'
                    },
                    tick: {
                        format: tickFormat
                    }
                }
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            padding: {
                top: 10,
                right: 20,
                left: 40,
            }
        });
    }

    $("#month-start").datepicker({
        format: "yyyy-mm",
        viewMode: "months",
        minViewMode: "months"
    });

    $("#month-end").datepicker({
        format: "yyyy-mm",
        viewMode: "months",
        minViewMode: "months"
    });

    $("#year-start").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    });

    $("#year-end").datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years"
    });

    /*$("#advance-daterange span").html(moment().subtract("days", 29).format("MMMM D, YYYY") + " - " + moment().format("MMMM D, YYYY")), */
    $("#advance-daterange").daterangepicker({
        format: "MM/DD/YYYY",
        startDate: moment().subtract(29, "days"),
        endDate: moment(),
        minDate: "01/01/2012",
        maxDate: "12/31/2015",
        dateLimit: {
            days: 60
        },
        showDropdowns: !0,
        showWeekNumbers: !0,
        timePicker: !1,
        timePickerIncrement: 1,
        timePicker12Hour: !0,
        ranges: {
            Today: [moment(), moment()],
            Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
            "Last 7 Days": [moment().subtract(6, "days"), moment()],
            "Last 30 Days": [moment().subtract(29, "days"), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
            "Last Month": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
        },
        opens: "right",
        drops: "down",
        buttonClasses: ["btn", "btn-sm"],
        applyClass: "btn-primary",
        cancelClass: "btn-default",
        separator: " to ",
        locale: {
            applyLabel: "Submit",
            cancelLabel: "Cancel",
            fromLabel: "From",
            toLabel: "To",
            customRangeLabel: "Custom",
            daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            firstDay: 1
        }
    }, function(a, t) {
        $("#advance-daterange span").html(a.format("YYYY-MM-DD") + " - " + t.format("YYYY-MM-DD"))
    });

    /*$("#date-range").hide();*/
    $("#month-range").hide();
    $("#year-range").hide();
    $("#downloadButton").hide();

    $("#time-interval").change(function() {
        time = $("#time-interval").val();
        if(time === "day"){
            $("#date-range").show();
            $("#month-range").hide();
            $("#year-range").hide()
        } else if(time === "month"){
            $("#date-range").hide();
            $("#month-range").show();
            $("#year-range").hide()
        } else if(time === "year"){
            $("#date-range").hide();
            $("#month-range").hide();
            $("#year-range").show();
        }
    });

    $("#view-button").click(function() {
        if(time === "day"){
            var date = $("#date-start-end").html();
            dateStart = date.substr(0, 10);
            dateEnd = date.substr(13);
            xFormat = "%Y-%m-%d";
            tickFormat = "%Y-%m-%d";
            xAxisLabel = "Date(Day)";

        } else if(time === "month"){
            dateStart = $("#month-start").val();
            dateEnd = $("#month-end").val();
            xFormat = "%Y-%m";
            tickFormat = "%Y-%m";
            xAxisLabel = "Date(Month)";
            
        } else if(time === "year"){
            dateStart = $("#year-start").val();
            dateEnd = $("#year-end").val();
            xFormat = '%Y';
            tickFormat = "%Y";
            xAxisLabel = "Date(Year)";
        }

        var title = $("#analytics-option").val();

        console.log(getDates(dateStart, dateEnd));

        createGraph(title, dateStart, dateEnd, tickFormat, xFormat, xAxisLabel);
        $("#downloadButton").show();
        $('#myModal').modal('hide');
    });


    $("#downloadButton").click(function() {
        var svg = $('svg');
        svg.attr("id", "svg-id");

        var chart = document.getElementById("svg-id");
        saveSvgAsPng(chart, "diagram.png", {scale: 2});
    });

});
