Template.dashboardLayout.helpers({
	userName: function() {
		return Meteor.user().profile.name;
	}
});