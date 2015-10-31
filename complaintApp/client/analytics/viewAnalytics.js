if (Meteor.isClient) {
	Template.viewAnalytics.onRendered(function(){

        function getFormatDate(date){
            var day = date.getDate();
            var month = date.getMonth();
            var year = date.getFullYear();

            var finalDate = year + "-" + month + "-" + day;
            return finalDate;
        }

        function getPastWeek(){
            var week = ['x'];

            var d = "";

            for (i = 6; i >=1; i--){
                d = new Date();
                d.setDate(d.getDate() - i);
                d = getFormatDate(d);
                week.push(d);
            }

            d = getFormatDate(new Date());
            week.push(d);

            return week;
        }

        function getPastWeekComplaints(){
            var totalComplaints = ['Total Number of Complaints'];

            var noOfComplaintToday  = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date()}}).count();
            totalComplaints.push(noOfComplaintToday);

            for (i = 1; i <=7; i++) { 
                var complaints = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-(i+1))), "$lte": new Date(new Date().setDate(new Date().getDate()-i))}}).count();
                totalComplaints.push(complaints);
            }

            return totalComplaints;
            /*var noOfComplaintToday  = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date()}}).count();     
            var noOfComplaintPrevOneDay = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-2)), "$lte": new Date(new Date().setDate(new Date().getDate()-1))}}).count();
            var noOfComplaintPrevDayTwo = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-3)), "$lte": new Date(new Date().setDate(new Date().getDate()-2))}}).count();
            var noOfComplaintPrevDayThree = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-4)), "$lte": new Date(new Date().setDate(new Date().getDate()-3))}}).count();
            var noOfComplaintPrevDayFour = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-5)), "$lte": new Date(new Date().setDate(new Date().getDate()-4))}}).count();
            var noOfComplaintPrevDayFive = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-6)), "$lte": new Date(new Date().setDate(new Date().getDate()-5))}}).count();
            var noOfComplaintPrevDaySix = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()-6))}}).count();*/
        }

        function getPastWeekCompliments () {
            var totalCompliments = ['Total Number of Compliments'];

            var noOfComplimentsToday  = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date()}}).count();
            totalCompliments.push(noOfComplimentsToday);

            for (i = 1; i <=7; i++) { 
                var compliments = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-(i+1))), "$lte": new Date(new Date().setDate(new Date().getDate()-i))}}).count();
                totalCompliments.push(compliments);
            }

            return totalCompliments;
        }

        $(".ui-sortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".ui-sortable",
            forcePlaceholderSize: true,
            zIndex: 999999
        }).disableSelection();

        var xFormat = "%Y-%m-%d";
        var tickFormat = "%Y-%m-%d";
        var xAxisLabel = "Date(Day)";

        /*var chart = c3.generate({
            bindto: '#complaints',
            data: {
                x: 'x',
                columns: [
                    ['x', 30, 50, 100, 230, 300, 310],
                    ['data1', 30, 200, 100, 400, 150, 250],
                    ['data2', 130, 300, 200, 300, 250, 450]
                ]
            }
        });*/
		
		//var dateNow = new Date();
		//new Date(new Date().setDate(new Date().getDate()-5))
		//complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-1)), "$lte": new Date(new Date().setDate(new Date().getDate()-2))}}).count();
		
        /*var complaintsData = [];
        complaintsData.push()*/
        var chart1 = c3.generate({
            bindto: '#complaints',
            data: {
                x: 'x',
                columns: [
                    getPastWeek(),
                    getPastWeekComplaints()
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
            }
        });


        var chart2 = c3.generate({
            bindto: '#complaints-per-cat',
            data: {
                x: 'x',
                xFormat: xFormat,
                columns: [
                    getPastWeek(),
                    ['Total Number of Complaints', 30, 200, 100, 400, 150, 250]
                ],
                type: 'bar'
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
            }
        });
			
        var chart3 = c3.generate({
            bindto: '#compliments',
            data: {
                x: 'x',
                xFormat: xFormat,
                columns: [
                    getPastWeek(),
                    getPastWeekCompliments()
                ],
                type: 'bar'
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
            }
        });

        var chart4 = c3.generate({
            bindto: '#avg-complaint-time',
            data: {
                x: 'x',
                xFormat: xFormat,
                columns: [
                    getPastWeek(),
                    ['Average Time Taken Per Case', 30, 200, 100, 400, 150, 250]
                ],
                type: 'bar'
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
            }
        });

        $("#testButton").click(function() {
            console.log("hello");
            console.log(getPastWeek());
            var test = noOfComplaintPrevOneDay = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-2)), "$lte": new Date(new Date().setDate(new Date().getDate()-1))}}).count();
            console.log(getPastWeekCompliments());
            console.log(getPastWeekComplaints());
        });     

    });

    Template.viewAnalytics.helpers({
        totalNoOfComplaints: function() {
            return complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();              
        }
    });
    
    Template.viewAnalytics.helpers({
        totalNoOfCompliments: function() {
            return complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();
        }
    });
	
}