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
    }
});