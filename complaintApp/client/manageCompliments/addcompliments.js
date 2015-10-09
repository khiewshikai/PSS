if (Meteor.isClient) {
	Template.addCompliments.events({
		'click .submitComplimentBtn': function(event, template) {
			event.preventDefault();

			var complimentNameVar = template.$('[name=addComplimentName]').val();
			var complimentNRICVar = template.$('[name=addComplimentNRIC]').val();
			var complimentContactVar = template.$('[name=addComplimentContact]').val();
			var complimentEmailVar = template.$('[name=addComplimentEmail]').val();
			var complimentCompanyVar = template.$('[name=addComplimentCompany]').val();
			var complimentProdCatVar = template.$('[name=addComplimentProdCat]').val();
			var complimentCommentsVar = template.$('[name=addComplimentComments]').val();

            var isEmpty = false;
			
			if (!complimentNameVar || complimentNameVar === '') {
            	template.$('[name=addComplimentName]').addClass('error-desc');
            	template.$('[name=addComplimentName]').attr('placeholder', 'Please fill in the Complimenant Name');
            	var isEmpty = true;
        	}
        	if (!complimentNRICVar || complimentNRICVar === '') {
            	template.$('[name=addComplimentNRIC]').addClass('has-error');
            	template.$('[name=addComplimentNRIC]').attr('placeholder', 'Please fill in the Complimenant NRIC');
            	var isEmpty = true;
        	}
        	if (!complimentContactVar || complimentContactVar === '') {
            	template.$('[name=addComplimentContact]').addClass('has-error');
            	template.$('[name=addComplimentContact]').attr('placeholder', 'Please fill in the Complimenant Contact');
            	var isEmpty = true;
        	}
        	if (!complimentEmailVar || complimentEmailVar === '') {
            	template.$('[name=addComplimentEmail]').addClass('has-error');
            	template.$('[name=addComplimentEmail]').attr('placeholder', 'Please fill in the Complimenant Email');
            	var isEmpty = true;
        	}
        	if (!complimentCompanyVar || complimentCompanyVar === '') {
            	template.$('[name=addComplimentCompany]').addClass('has-error');
            	template.$('[name=addComplimentCompany]').attr('placeholder', 'Please fill in the Complimenant Company');
            	var isEmpty = true;
        	}
        	if (!complimentCommentsVar || complimentCommentsVar === '') {
            	template.$('[name=addComplimentComments]').addClass('has-error');
            	template.$('[name=addComplimentComments]').attr('placeholder', 'Please fill in the Complimenant Comments');
            	var isEmpty = true;
        	}

            if (isEmpty) {
                return;
            };

			var currentUser = Meteor.user();
            var complimentID = complimentsCollection.find().count()+1;
            var dateTimeOpen = new Date();

			complimentsCollection.insert({
				complimenantID: complimentID,
				complimenantName: complimentNameVar,
				complimenantNRIC: complimentNRICVar,
				complimenantContact: complimentContactVar,
				complimenantEmail: complimentEmailVar,
				companyToCompliment:complimentCompanyVar,
				productCategory: complimentProdCatVar,
				complimenantComment: complimentCommentsVar, 	
				complimentCreatedBy: currentUser,
				complimentTimeCreated: dateTimeOpen,
            });

            var emailMsg = "You have successfully submitted a compliment on CASE Complaint Compliment Management System. Below is your compliment details.";

            Meteor.call('sendEmail',
            complimentEmailVar,
            'ccms@case.com',
            'Dear ' + complimentNameVar,
            emailMsg);

            template.$(".complimentIDPrint").html(complimentID);
            template.$(".complimentTimePrint").html(dateTimeOpen);
            template.$(".complimentNamePrint").html(complimentNameVar);
            template.$(".complimentNRICPrint").html(complimentNRICVar);
            template.$(".complimentContactPrint").html(complimentContactVar);
            template.$(".complimentEmailPrint").html(complimentEmailVar);
            template.$(".complimentCategoryPrint").html(complimentProdCatVar);
            template.$(".complimentCompanyPrint").html(complimentCompanyVar);
            template.$(".complimentCommentPrint").html(complimentCommentsVar);

            template.$(".complimentForm").addClass("hide");
            template.$(".complimentSubmitted").removeClass("hide");

            template.$("[name=addComplimentName]").val("");
            template.$("[name=addComplimentNRIC]").val("");
            template.$("[name=addComplimentContact]").val("");
            template.$("[name=addComplimentEmail]").val("");
            template.$(".complimentCategory").prop('selectedIndex',0);
            template.$("[name=addComplimentCompany]").val("");
            template.$("[name=addComplimentComments]").val("");
		},

        'click .resetComplimentBtn':function(event, template){            
            template.$("[name=addComplimentName]").val("");
            template.$("[name=addComplimentNRIC]").val("");
            template.$("[name=addComplimentContact]").val("");
            template.$("[name=addComplimentEmail]").val("");
            template.$(".complimentCategory").prop('selectedIndex',0);
            template.$("[name=addComplimentCompany]").val("");
            template.$("[name=addComplimentComments]").val("");
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
}