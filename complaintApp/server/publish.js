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
    	// console.log(companyAndComplaintsCount);
    	return companyAndComplaintsCount;
	}
})

Meteor.publishComposite("complaintsCollection", function (tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));

  this.unblock(); // requires meteorhacks:unblock package

  return {
    find: function () {
      this.unblock(); // requires meteorhacks:unblock package

      return complaintsCollection.find({_id: {$in: ids}}, {fields: fields});
    },
    children: [
      {
        find: function(complaint) {
          this.unblock(); // requires meteorhacks:unblock package
          // Publish the related user
          //return Meteor.users.find({_id: feedback.userId}, {limit: 1, fields: {emails: 1}, sort: {_id: 1}});
          return tasksCollection.findOne({_id: complaint._id}).managerID
          //return Meteor.users.findOne({_id: mgrMongoID}).profile.name
        }
      }
    ]
  };
});