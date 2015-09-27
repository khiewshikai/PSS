Meteor.startup(function() {
	if(tasksCollection.find().count() === 0) {
		tasksCollection.insert({
			complaintID: "1",
			managerID: "EqyKJNXXQ9TEjxqEh",
			creatorID: "3",
			isViewed: "true"
		});

		tasksCollection.insert({
			complaintID: "2",
			managerID: "EqyKJNXXQ9TEjxqEh",
			creatorID: "4",
			isViewed: "true"
		});

		tasksCollection.insert({
			complaintID: "3",
			managerID: "2",
			creatorID: "3",
			isViewed: "true"
		});

		tasksCollection.insert({
			complaintID: "4",
			managerID: "2",
			creatorID: "4",
			isViewed: "true"
		});
	}

	if(complaintsCollection.find().count() === 0) {
		complaintsCollection.insert({
			complaintID: "1",
			complainantName: "customer 01",
			complainantNRIC: "S12345678N",			
			complainantContact: "84051234",
			complainantEmail: "first@hotmail.com",
			companyToComplain: "Mobile Air",
			productCategory: "Electrical and Electronics",
			followerUp: "N/A",
			complainantComment: "The store requires me to purchase extra warranty that costs me $1000+. When I refuse to pay, the boss forced me to pay for consultation fee.",
			managerInstruction: "Case will be investigated",
			status: "open",
			dateTimeOpen: "26-09-2015 03:03PM",
			dateTimeClose: "N/A"
		});

		complaintsCollection.insert({
			complaintID: "2",
			complainantName: "customer 02",
			complainantNRIC: "S22345678N",
			complainantContact: "84052234",
			complainantEmail: "second@hotmail.com",
			companyToComplain: "Mobile Air",
			productCategory: "Electrical and Electronics",
			followerUp: "N/A",
			complainantComment: "The store requires me to purchase extra warranty that costs me $1000+. When I refuse to pay, the boss forced me to pay for consultation fee.",
			managerInstruction: "Case will be investigated",
			status: "open",
			dateTimeOpen: "26-09-2015 03:13PM",
			dateTimeClose: "N/A"
		});

		complaintsCollection.insert({
			complaintID: "3",
			complainantName: "customer 03",
			complainantNRIC: "S32345678N",			
			complainantContact: "84053234",
			complainantEmail: "third@hotmail.com",
			companyToComplain: "Mobile Air",
			productCategory: "Electrical and Electronics",
			followerUp: "N/A",
			complainantComment: "The store requires me to purchase extra warranty that costs me $1000+. When I refuse to pay, the boss forced me to pay for consultation fee.",
			managerInstruction: "Case will be investigated",
			status: "open",
			dateTimeOpen: "26-09-2015 03:23PM",
			dateTimeClose: "N/A"
		});

		complaintsCollection.insert({
			complaintID: "4",
			complainantName: "customer 04",
			complainantNRIC: "S42345678N",			
			complainantContact: "84054234",
			complainantEmail: "fourth@hotmail.com",
			companyToComplain: "Mobile Air",
			productCategory: "Electrical and Electronics",
			followerUp: "N/A",
			complainantComment: "The store requires me to purchase extra warranty that costs me $1000+. When I refuse to pay, the boss forced me to pay for consultation fee.",
			managerInstruction: "Case will be investigated",
			status: "open",
			dateTimeOpen: "26-09-2015 03:33PM",
			dateTimeClose: "N/A"
		});
	}
});