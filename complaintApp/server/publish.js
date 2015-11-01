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

Meteor.methods({
	getCompanyAndComplaintsCount: function() {
		var companyAndComplaintsCount = complaintsCollection.aggregate(
	       	[
	        	{ $group: { _id: "$companyToComplain", count: { $sum: 1 } } }
	     	]
    	);
    	console.log(companyAndComplaintsCount);
    	return companyAndComplaintsCount;
	}
})