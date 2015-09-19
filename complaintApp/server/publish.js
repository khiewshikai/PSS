Meteor.publish("userData", function() {
	return Meteor.users.find({}, {
		fields:{
			createdAt: true,
			profile: true,
			emails: true,
			username: true
		}
	});
});