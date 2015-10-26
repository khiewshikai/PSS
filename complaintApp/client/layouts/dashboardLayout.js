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
        return tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz", isViewed:false}).fetch().length;
    },

    isNewTaskAvailable: function(){
    	return tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz", isViewed:false}).fetch().length > 0;
    }   
});