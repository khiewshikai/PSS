Template.complaint.events({
	'click .submitComplaintBtn':function(event, template){
		event.preventDefault();

		var complaintName = template.$(".complaintName").val();
		var complaintNRIC = template.$(".complaintNRIC").val();
		var complaintContact = template.$(".complaintContact").val();
		var complaintEmail = template.$(".complaintEmail").val();
		var complaintCategory = template.$(".complaintCategory :selected").text();
		var complaintCompany = template.$(".complaintCompany").val();
		var complaintComment = template.$(".complaintComment").val();

		var complaintId = complaintsCollection.find().count();
		var timeSubmitted = new Date();

		// insert into collection
		complaintsCollection.insert({
			complaintID: complaintId + 1,
			complainantName: complaintName,
			complainantNRIC: complaintNRIC,			
			complainantContact: complaintContact,
			complainantEmail: complaintEmail,
			companyToComplain: complaintCompany,
			productCategory: complaintCategory,
			followerUp: "N/A",
			complainantComment: complaintComment,
			managerInstruction: "Case will be investigated",
			status: "open",
			dateTimeOpen: timeSubmitted,
			dateTimeClose: "N/A"
		});

		Meteor.call('sendEmail',
			complaintEmail,
			'ccms@case.com',
			'Dear ' + complaintName,
			'This is a test of Email.send.');


		// add to print
		template.$(".complaintIDPrint").html(complaintId + 1);
		template.$(".complaintTimePrint").html(timeSubmitted);
		template.$(".complaintNamePrint").html(complaintName);
		template.$(".complaintNRICPrint").html(complaintNRIC);
		template.$(".complaintContactPrint").html(complaintContact);
		template.$(".complaintEmailPrint").html(complaintEmail);
		template.$(".complaintCategoryPrint").html(complaintCategory);
		template.$(".complaintCompanyPrint").html(complaintCompany);
		template.$(".complaintCommentPrint").html(complaintComment);

		// reset form
		template.$(".complaintName").val("");
		template.$(".complaintNRIC").val("");
		template.$(".complaintContact").val("");
		template.$(".complaintEmail").val("");
		template.$(".complaintCategory").prop('selectedIndex',0);
		template.$(".complaintCompany").val("");
		template.$(".complaintComment").val("");

		template.$(".complaintForm").addClass("hide");
		template.$(".complaintSubmitted").removeClass("hide");
	},

	'click .resetComplaintBtn':function(event, template){
		
		template.$(".complaintName").val("");
		template.$(".complaintNRIC").val("");
		template.$(".complaintContact").val("");
		template.$(".complaintEmail").val("");
		template.$(".complaintCategory").prop('selectedIndex',0);
		template.$(".complaintCompany").val("");
		template.$(".complaintComment").val("");

		event.preventDefault();
	}
});