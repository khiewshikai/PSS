Template.complaint.events({
	'click .submitComplaintBtn':function(event, template){
		event.preventDefault();

		var complaintName = template.$(".complaintName").val();
		var complaintNRIC = template.$(".complaintNRIC").val();
		var complaintContact = template.$(".complaintContact").val();
		var complaintEmail = template.$(".complaintEmail").val();
		var complaintCategory = template.$(".complaintCategory").val();
		var complaintCompany = template.$(".complaintCompany").val();
		var complaintComment = template.$(".complaintComment").val();

		var complaintId = complaintsCollection.find().count();

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
			dateTimeOpen: new Date(),
			dateTimeClose: "N/A"
		});

		template.$(".complaintName").val("");
		template.$(".complaintNRIC").val("");
		template.$(".complaintContact").val("");
		template.$(".complaintEmail").val("");
		template.$(".complaintCategory").prop('selectedIndex',0);
		template.$(".complaintCompany").val("");
		template.$(".complaintComment").val("");
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