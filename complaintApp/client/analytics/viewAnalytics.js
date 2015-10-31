Template.viewAnalytics.onRendered(function(){

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
			xFormat: xFormat,
			columns: [
			['x', '2012-12-31', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
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
		}
	});

	//var dateNow = new Date();
	//new Date(new Date().setDate(new Date().getDate()-5))
	//complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-1)), "$lte": new Date(new Date().setDate(new Date().getDate()-2))}}).count();
	var noOfComplaintToday  = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date()}}).count();     
	var noOfComplaintPrevOneDay = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-2)), "$lte": new Date(new Date().setDate(new Date().getDate()-1))}}).count();
	var noOfComplaintPrevDayTwo = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-3)), "$lte": new Date(new Date().setDate(new Date().getDate()-2))}}).count();
	var noOfComplaintPrevDayThree = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-4)), "$lte": new Date(new Date().setDate(new Date().getDate()-3))}}).count();
	var noOfComplaintPrevDayFour = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-5)), "$lte": new Date(new Date().setDate(new Date().getDate()-4))}}).count();
	var noOfComplaintPrevDayFive = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-6)), "$lte": new Date(new Date().setDate(new Date().getDate()-5))}}).count();
	var noOfComplaintPrevDaySix = complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()-6))}}).count();

	var chart1 = c3.generate({
		bindto: '#complaints',
		data: {
			columns: [
			['Total Number of Complaints', noOfComplaintPrevDayFive, noOfComplaintPrevDayFour, noOfComplaintPrevDayThree, noOfComplaintPrevDayTwo, noOfComplaintPrevOneDay, noOfComplaintToday]
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
		}
	});

	var chart2 = c3.generate({
		bindto: '#complaints-per-cat',
		data: {
			x: 'x',
			xFormat: xFormat,
			columns: [
			['x', '2012-12-31', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
			['Total Number of Complaints Per Category', 30, 200, 100, 400, 150, 250]
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

	var noOfComplimentsToday  = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date()}}).count();
	var noOfComplimentsPrevOneDay = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-2)), "$lte": new Date(new Date().setDate(new Date().getDate()-1))}}).count();
	var noOfComplimentsPrevDayTwo = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-3)), "$lte": new Date(new Date().setDate(new Date().getDate()-2))}}).count();
	var noOfComplimentsPrevDayThree = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-4)), "$lte": new Date(new Date().setDate(new Date().getDate()-3))}}).count();
	var noOfComplimentsPrevDayFour = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-5)), "$lte": new Date(new Date().setDate(new Date().getDate()-4))}}).count();
	var noOfComplimentsPrevDayFive = complimentsCollection.find({"complimentTimeCreated":{"$gte": new Date(new Date().setDate(new Date().getDate()-6)), "$lte": new Date(new Date().setDate(new Date().getDate()-5))}}).count();

	var chart3 = c3.generate({
		bindto: '#compliments',
		data: {
			x: 'x',
			xFormat: xFormat,
			columns: [
			['x', '2012-12-31', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
			['Total Number of Compliments', 30, 200, 100, 400, 150, 250]
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
			  // columns: [
			  //   ['Total Number of Compliments', noOfComplimentsPrevDayFive, noOfComplimentsPrevDayFour, noOfComplimentsPrevDayThree, noOfComplimentsPrevDayTwo, noOfComplimentsPrevOneDay, noOfComplimentsToday]
			  // ],
			  // type: 'bar'
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
			['x', '2012-12-31', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
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

});

Template.viewAnalytics.helpers({
	totalNoOfComplaints: function() {
		return complaintsCollection.find({"dateTimeOpen":{"$gte": new Date(new Date().setDate(new Date().getDate()-7)), "$lte": new Date(new Date().setDate(new Date().getDate()))}}).count();
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

			if (complaint.status == "closed") {
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
					name = manager.profile.name;
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