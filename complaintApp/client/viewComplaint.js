Template.viewComplaint.events({
	'click .viewComplaintBtn':function(event, template) {
		event.preventDefault();

		var caseID = template.$(".caseId").val();
		var caseNRIC = template.$(".caseNRIC").val();

		var complaint = complaintsCollection.findOne({complaintID: parseInt(caseID), complainantNRIC: caseNRIC});

		template.complaint.set(complaint);

		// reset form
		template.$(".caseId").val("");
		template.$(".caseNRIC").val("");

		template.$(".searchResult").removeClass("hide");
	}
});

Template.viewComplaint.created = function() {
	this.complaint = new ReactiveVar({});
}

Template.viewComplaint.helpers({
	// reactive var
	complaint: function() {
		return Template.instance().complaint.get();
	}

});