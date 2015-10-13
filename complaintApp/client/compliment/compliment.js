Template.compliment.events({
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
		template.$(".complimentIDPrint").html(complimentId);
		template.$(".complimentTimePrint").html(timeSubmitted);
		template.$(".complimentNamePrint").html(complimentNameVar);
		template.$(".complimentNRICPrint").html(complimentNRICVar);
		template.$(".complimentContactPrint").html(complimentContactVar);
		template.$(".complimentEmailPrint").html(complimentEmailVar);
		template.$(".complimentCategoryPrint").html(complimentProdCatVar);
		template.$(".complimentCompanyPrint").html(complimentCompanyVar);
		template.$(".complimentCommentPrint").html(complimentCommentsVar);

		// reset form
		template.$(".complimentName").val("");
		template.$(".complimentNRIC").val("");
		template.$(".complimentContact").val("");
		template.$(".complimentEmail").val("");
		template.$(".complimentCategory").prop('selectedIndex',0);
		template.$(".complimentCompany").val("");
		template.$(".complimentComment").val("");

		template.$(".complimentForm").addClass("hide");
		template.$(".complimentSubmitted").removeClass("hide");
	},
});