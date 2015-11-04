Template.dashboardLayout.helpers({
	userName: function() {
		return Meteor.user().username;
	},

	userRole: function() {
		return Meteor.user().profile.role;
	},

	active: function(routeName) {
        var curRoute = Router.current().route.getName();
        return curRoute === routeName ? 'active' : '';
    },

    getNewTaskSize: function(){
        // console.log(tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz"}).fetch());
        var tasks = tasksCollection.find({managerID:Meteor.userId(), isViewed:false}).fetch();//get new tasks that are not viewed yet
        var complaints = new Array();
        tasks.forEach(function(element,index){
            complaint = complaintsCollection.findOne({complaintID: element.complaintID, status:{$ne:"Closed"}}); //get complaints that are not closed yet
            if(complaint){//if complaint object is not undefined
                complaints.push(complaint);
            }
        })        
        return complaints.length;
    },

    isNewTaskAvailable: function(){
    	return tasksCollection.find({managerID:Meteor.userId(), isViewed:false}).fetch().length > 0;
    }   
});