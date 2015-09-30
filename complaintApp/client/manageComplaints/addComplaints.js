if (Meteor.isClient) {
	Template.addComplaints.events({
		'submit form': function(event, template) {
			event.preventDefault();

			var complaintNameVar = template.$('[name=addComplaintName]').val();
			var complaintNRICVar = template.$('[name=addComplaintNRIC]').val();
			var complaintContactVar = template.$('[name=addComplaintContact]').val();
			var complaintEmailVar = template.$('[name=addComplaintEmail]').val();
			var complaintCompanyVar = template.$('[name=addComplaintCompany]').val();
			var complaintProdCatVar = template.$('[name=addComplaintProdCat]').val();
			var complaintCommentsVar = template.$('[name=addComplaintComments]').val();
			var complaintFollowUpVar = template.$('[name=addComplaintFollowUp]').val();
			var complaintManagerCommentsVar = template.$('[name=addComplaintManagerComments]').val();
			
			if (!complaintNameVar || complaintNameVar === '') {
            	template.$('[name=addComplaintName]').addClass('error-desc');
            	template.$('[name=addComplaintName]').attr('placeholder', 'Please fill in the Complainant Name');
            	return;
        	}
        	if (!complaintNRICVar || complaintNRICVar === '') {
            	template.$('[name=addComplaintNRIC]').addClass('has-error');
            	template.$('[name=addComplaintNRIC]').attr('placeholder', 'Please fill in the Complainant NRIC');
            	return;
        	}
        	if (!complaintContactVar || complaintContactVar === '') {
            	template.$('[name=addComplaintContact]').addClass('has-error');
            	template.$('[name=addComplaintContact]').attr('placeholder', 'Please fill in the Complainant Contact');
            	return;
        	}
        	if (!complaintEmailVar || complaintEmailVar === '') {
            	template.$('[name=addComplaintEmail]').addClass('has-error');
            	template.$('[name=addComplaintEmail]').attr('placeholder', 'Please fill in the Complainant Email');
            	return;
        	}
        	if (!complaintCompanyVar || complaintCompanyVar === '') {
            	template.$('[name=addComplaintCompany]').addClass('has-error');
            	template.$('[name=addComplaintCompany]').attr('placeholder', 'Please fill in the Complainant Company');
            	return;
        	}
        	if (!complaintCommentsVar || complaintCommentsVar === '') {
            	template.$('[name=addComplaintComments]').addClass('has-error');
            	template.$('[name=addComplaintComments]').attr('placeholder', 'Please fill in the Complainant Comments');
            	return;
        	}
        	if (!complaintFollowUpVar || complaintFollowUpVar === '') {
            	template.$('[name=addComplaintFollowUp]').addClass('has-error');
            	template.$('[name=addComplaintFollowUp]').attr('placeholder', 'Please fill in the Follow Up');
            	return;
        	}

			var currentUser = Meteor.user();

			complaintsCollection.insert({
				complainantID: complaintsCollection.find().count()+1,
				complainantName: complaintNameVar,
				complainantNRIC: complaintNRICVar,
				complainantContact: complaintContactVar,
				complainantEmail: complaintEmailVar,
				companyToComplain:complaintCompanyVar,
				productCategory: complaintProdCatVar,
				followerUp: complaintFollowUpVar,
				complainantComment: complaintCommentsVar,     	
				managerInstruction: complaintManagerCommentsVar,
				complaintStatus: "Open",        	
				complaintCreatedBy: currentUser,
				complaintTimeCreated: new Date(),
        		complaintTimeClosed: "" // current time
        });
			template.dashboard.set(true);
		}
	});	
}