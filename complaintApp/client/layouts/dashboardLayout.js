Template.dashboardLayout.helpers({
	userName: function() {
		return Meteor.user().profile.name;
	},

	active: function(routeName) {
        var curRoute = Router.current().route.getName();
        return curRoute === routeName ? 'active' : '';
    }
});