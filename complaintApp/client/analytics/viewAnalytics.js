if (Meteor.isClient) {
    Template.viewAnalytics.onRendered(function(){
		
		function getManagersTaskCount(){
			//setTimeout(function(){
				var result =[];
				var managerNameArray = ['x'];
				var managerTask = ["No. of tasks"];
				
				var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();
				console.log(listOfManager)
				for(index = 0; index < listOfManager.length; index++){
					var managerObj = listOfManager[index].username;
					var managerMongoID = listOfManager[index]._id;
					managerNameArray.push(managerObj);	
					var taskCount = tasksCollection.find({managerID: managerMongoID}).count();
					managerTask.push(taskCount)
					console.log("rrrrrrrrrrrrr")
				}
				result.push(managerNameArray);
				result.push(managerTask);
				console.log(result);
				return result;
			//},100)
			
		}

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

            for (i = 6; i >= 1 ; i--) {
                var complaints = complaintsCollection.find({"status":{"$ne":"Void"}, "dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-(i+1))), "$lte": new Date(new Date().setDate(new Date().getDate()-i))}}).count();
                totalComplaints.push(complaints);
            }
            
            var noOfComplaintToday  = complaintsCollection.find({"status":{"$ne":"Void"}, "dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-1)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();           
            totalComplaints.push(noOfComplaintToday);
            
            console.log(totalComplaints);
            
            return totalComplaints;
        }

        function getPastWeekCompliments () {
            var totalCompliments = ['Total Number of Compliments'];
            
            for (i = 6; i >= 1 ; i--) { 
                var compliments = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-(i+1))), "$lte": new Date(new Date().setDate(new Date().getDate()-i))}}).count();
                totalCompliments.push(compliments);
            }
            
            var noOfComplimentsToday  = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-1)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();
            totalCompliments.push(noOfComplimentsToday);
            console.log(totalCompliments);
            
            return totalCompliments;
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

        $(".ui-sortable").sortable({
            placeholder: "sort-highlight",
            connectWith: ".ui-sortable",
            forcePlaceholderSize: true,
            zIndex: 999999
        }).disableSelection();

        var xFormat = "%Y-%m-%d";
        var tickFormat = "%Y-%m-%d";
        var xAxisLabel = "Date(Day)";

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

        var catResults = getComplaintsPerCategory();
        var catTitle = ["x"];
        var numPerCatData = ['Total Number of Complaints Per Category'];
        catResults.forEach(function(a){
            catTitle.push(a[0]);
            numPerCatData.push(a[1]);
        });
        var chart2 = c3.generate({
            bindto: '#complaints-per-cat',
            data: {
                x: 'x',
                columns: [
                    catTitle, numPerCatData
                ],
                type: 'bar'
            },
            axis: {
                x: {
                    type: 'category',
					label: {
                        text: "Category",
                        position: 'outer-right'
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
		
		var resultManagerListCount = getManagersTaskCount();
		console.log("test "+resultManagerListCount[0]);
		console.log("test "+resultManagerListCount[1]);
		
        var chart4 = c3.generate({
            bindto: '#avg-complaint-time',
            data: {
                x: 'x',
                xFormat: xFormat,
                columns: [
                    resultManagerListCount[0],
                    resultManagerListCount[1]
                ],
                type: 'bar'
            },
            axis: {
                x: {
                    type: 'category',
					label: {
                        text: "Managers",
                        position: 'outer-right'
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

        /*$("#testButton").click(function() {
            var test = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date()}}).count();
            console.log(test);
            console.log(Complaints());

        });   */  

    });
    
}

Template.viewAnalytics.helpers({
    totalNoOfComplaints: function() {
        return complaintsCollection.find({"status":{"$ne":"Void"}, "dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();
    },

    totalNoOfCompliments: function() {
        return complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();
    },

    topCompanies: function() {
        var companiesArray = [];
        var complaintsCol = complaintsCollection.find().fetch();

        // group by companies
        var groupedCompanies = _.groupBy(_.pluck(complaintsCol, 'companyToComplain'));

        // sort the array
        groupedCompanies = _.sortBy(groupedCompanies, function(group){ 
            return group.length; 
        });
        groupedCompanies = groupedCompanies.reverse();

        _.each(_.values(groupedCompanies), function(group) {
            if (companiesArray.length < 5) {
                companiesArray.push({
                    company: group[0],
                    count: group.length
                });
            }
        });

        return companiesArray;
    },

    topCaseManagers: function() {
        var managerArray = [];

        var taskCol = tasksCollection.find().fetch();
        var closedTaskArray = [];

        _.each(_.values(taskCol), function(task) {
            var complaint = complaintsCollection.findOne({
                complaintID: task.complaintID
            });

            if (complaint.status == "Closed") {
                closedTaskArray.push(task);
            }
        });

        // group by manager
        var groupedManager = _.groupBy(_.pluck(closedTaskArray, 'managerID'));
        // sort the array
        groupedManager = _.sortBy(groupedManager, function(group){ 
            return group.length; 
        });
        groupedManager = groupedManager.reverse();

        var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();

        _.each(_.values(groupedManager), function(group) {
            if (managerArray.length < 5) {
                var manager = Meteor.users.findOne({
                    _id : group[0]
                });

                var name = "No name";
                if (manager) {
                    name = manager.username;
                }

                managerArray.push({
                    manager: name,
                    count: group.length
                });
            }
        });

        return managerArray;
    }
});

