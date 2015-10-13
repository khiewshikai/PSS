Template.complaint.events({
	'click .submitComplimentBtn':function(event, template){
		event.preventDefault();

		var complimentNameVar = template.$(".complimentName").val();
		var complimentNRICVar = template.$(".complimentNRIC").val();
		var complimentContactVar = template.$(".complimentContact").val();
		var complimentEmailVar = template.$(".complimentEmail").val();
		var complimentProdCatVar = template.$(".complimentCategory :selected").text();
		var complimentCompanyVar = template.$(".complimentCompany").val();
		var complimentCommentsVar = template.$(".complimentComment").val();

		var complimentId = complimentsCollection.find().count() + 1;
		var timeSubmitted = new Date();

		complimentsCollection.insert({
			ComplimenantID: complimentId,
			ComplimenantName: complimentNameVar,
			ComplimenantNRIC: complimentNRICVar,
			ComplimenantContact: complimentContactVar,
			ComplimenantEmail: complimentEmailVar,
			companyToCompliment:complimentCompanyVar,
			productCategory: complimentProdCatVar,
			ComplimenantComment: complimentCommentsVar,
			complimentCreatedBy: "public",
			complimentTimeCreated: timeSubmitted,
		});

		var emailMsg = "Thank you for submitting your compliment on CASE Complaint Compliment Management System. Below is your compliment details:";

		Meteor.call('sendEmail',
			complimentEmailVar,
			'ccms@case.com',
			'Dear ' + complimentNameVar,
			emailMsg);

		// add to print
		template.$(".complaintIDPrint").html(complaintId);
		template.$(".complaintTimePrint").html(timeSubmitted);
		template.$(".complaintNamePrint").html(complaintName);
		template.$(".complaintNRICPrint").html(complaintNRIC);
		template.$(".complaintContactPrint").html(complaintContact);
		template.$(".complaintEmailPrint").html(complaintEmail);
		template.$(".complaintCategoryPrint").html(complaintCategory);
		template.$(".complaintCompanyPrint").html(complaintCompany);
		template.$(".complaintCommentPrint").html(complaintComment);
	},
});