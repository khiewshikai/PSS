if (Meteor.isClient) {
    Template.detailedAnalytics.onRendered(function(){
        /*var chart1 = c3.generate({
            bindto: '#analytics-space',
            data: {
              columns: [
                ['Total Number of Complaints', 30, 200, 100, 400, 150, 250]
              ],
              type: 'bar'
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
            },
        });*/

        var time = $("#time-interval").val();
        var dateStart = "";
        var dateEnd = "";
        var tickFormat = "";
        var xFormat = "";
        var xAxisLabel = "";

        function createGraph(dateStart, dateEnd, tickFormat, xFormat, xAxisLabel){
            console.log("createGraph");
            var graph = c3.generate({
                bindto: '#analytics-space',
                data: {
                    x: 'x',
                    xFormat: xFormat,
                    columns: [
                        ['x', '2012-12-31', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
                        ['y', 30, 200, 100, 400, 150, 250]
                    ],
                    type: 'bar',
                },
                axis: {
                    x: {
                        type: 'timeseries',
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

            createGraph(dateStart, dateEnd, tickFormat, xFormat, xAxisLabel);
        });


        $("#downloadButton").click(function() {
            var svg = $('svg');
            svg.attr("id", "svg-id");

            var chart = document.getElementById("svg-id");
            saveSvgAsPng(chart, "diagram.png", {scale: 2});
        });
        
    });
}
