if (Meteor.isClient) {
	Template.addCompliments.events({
		'submit form': function(event, template) {
			event.preventDefault();

			var complimentNameVar = template.$('[name=addComplimentName]').val();
			var complimentNRICVar = template.$('[name=addComplimentNRIC]').val();
			var complimentContactVar = template.$('[name=addComplimentContact]').val();
			var complimentEmailVar = template.$('[name=addComplimentEmail]').val();
			var complimentCompanyVar = template.$('[name=addComplimentCompany]').val();
			var complimentProdCatVar = template.$('[name=addComplimentProdCat]').val();
			var complimentCommentsVar = template.$('[name=addComplimentComments]').val();
			
			if (!complimentNameVar || complimentNameVar === '') {
            	template.$('[name=addComplimentName]').addClass('error-desc');
            	template.$('[name=addComplimentName]').attr('placeholder', 'Please fill in the Complimenant Name');
            	return;
        	}
        	if (!complimentNRICVar || complimentNRICVar === '') {
            	template.$('[name=addComplimentNRIC]').addClass('has-error');
            	template.$('[name=addComplimentNRIC]').attr('placeholder', 'Please fill in the Complimenant NRIC');
            	return;
        	}
        	if (!complimentContactVar || complimentContactVar === '') {
            	template.$('[name=addComplimentContact]').addClass('has-error');
            	template.$('[name=addComplimentContact]').attr('placeholder', 'Please fill in the Complimenant Contact');
            	return;
        	}
        	if (!complimentEmailVar || complimentEmailVar === '') {
            	template.$('[name=addComplimentEmail]').addClass('has-error');
            	template.$('[name=addComplimentEmail]').attr('placeholder', 'Please fill in the Complimenant Email');
            	return;
        	}
        	if (!complimentCompanyVar || complimentCompanyVar === '') {
            	template.$('[name=addComplimentCompany]').addClass('has-error');
            	template.$('[name=addComplimentCompany]').attr('placeholder', 'Please fill in the Complimenant Company');
            	return;
        	}
        	if (!complimentCommentsVar || complimentCommentsVar === '') {
            	template.$('[name=addComplimentComments]').addClass('has-error');
            	template.$('[name=addComplimentComments]').attr('placeholder', 'Please fill in the Complimenant Comments');
            	return;
        	}

			var currentUser = Meteor.user();

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
			template.dashboard.set(true);
		}
	});	
}