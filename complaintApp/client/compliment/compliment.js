Template.compliment.events({
	'click .submitComplimentBtn':function(event, template){
		event.preventDefault();

		var complimentNameVar = template.$(".complimenantName").val();
		var complimentNRICVar = template.$(".complimenantNRIC").val();
		var complimentContactVar = template.$(".complimenantContact").val();
		var complimentEmailVar = template.$(".complimenantEmail").val();
		var complimentProdCatVar = template.$(".productCategory :selected").text();
		var complimentCompanyVar = template.$(".companyToCompliment").val();
		var complimentCommentsVar = template.$(".complimenantComment").val();

		var complimentId = complimentsCollection.find().count() + 1;
		var timeSubmitted = new Date();

		complimentsCollection.insert({
			complimenantID: complimentId,
			complimenantName: complimentNameVar,
			complimenantNRIC: complimentNRICVar,
			complimenantContact: complimentContactVar,
			complimenantEmail: complimentEmailVar,
			companyToCompliment:complimentCompanyVar,
			productCategory: complimentProdCatVar,
			complimenantComment: complimentCommentsVar,
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
		template.$(".complimenantName").val("");
		template.$(".complimenantNRIC").val("");
		template.$(".complimenantContact").val("");
		template.$(".complimenantEmail").val("");
		template.$(".productCategory").prop('selectedIndex',0);
		template.$(".companyToCompliment").val("");
		template.$(".complimenantComment").val("");

		template.$(".complimentForm").addClass("hide");
		template.$(".complimentSubmitted").removeClass("hide");
	},

	'click .resetComplimentBtn':function(event, template){
		
		template.$(".complimenantName").val("");
		template.$(".complimenantNRIC").val("");
		template.$(".complimenantContact").val("");
		template.$(".complimenantEmail").val("");
		template.$(".productCategory").prop('selectedIndex',0);
		template.$(".companyToCompliment").val("");
		template.$(".complimenantComment").val("");

		event.preventDefault();
	},

	'click .newComplimentBtn':function(event, template){            
		event.preventDefault();            
		template.$(".complimentSubmitted").addClass("hide");
		template.$(".complimentForm").removeClass("hide");
	},

	'click .backToHomeBtn':function(event, template){            
		event.preventDefault();
		Router.go('dashboard');
	}
});