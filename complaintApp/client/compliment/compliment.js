Template.complaint.events({
	'click .submitComplaintBtn':function(event, template){
		event.preventDefault();

		complimentsCollection.insert({
			ComplimenantID: complimentsCollection.find().count()+1,
			ComplimenantName: complimentNameVar,
			ComplimenantNRIC: complimentNRICVar,
			ComplimenantContact: complimentContactVar,
			ComplimenantEmail: complimentEmailVar,
			companyToCompliment:complimentCompanyVar,
			productCategory: complimentProdCatVar,
			ComplimenantComment: complimentCommentsVar,     	 	
			complimentCreatedBy: currentUser,
			complimentTimeCreated: new Date(),
		});
	},
});