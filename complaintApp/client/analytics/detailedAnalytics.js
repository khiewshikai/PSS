if (Meteor.isClient) {
    Template.detailedAnalytics.onRendered(function(){
        var chart1 = c3.generate({
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
        });

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
            $("#advance-daterange span").html(a.format("MMMM D, YYYY") + " - " + t.format("MMMM D, YYYY"))
        });

        $("#date-range").hide();
        $("#month-range").hide();
        $("#year-range").hide();

        var time = $("#time-interval").val();
        console.log(time);

    });
}
