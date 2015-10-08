Template.complaint.events({
	'click .submitComplaintBtn':function(event, template){
		event.preventDefault();

		var caseID = template.$(".caseId").val();
		var caseNRIC = template.$(".caseNRIC").val();

		var complaint = complaintsCollection.findOne({complaintID: caseID, complainantNRIC: caseNRIC});

		// reset form
		template.$(".complaintName").val("");
	}
});