if (Meteor.isClient) {
	Template.addComplaints.events({
		'click .submitComplaintBtn': function(event, template) {
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
		   var complaintCompanyAddressVar = template.$('[name=addComplaintCompanyAddress]').val();
           var complaintCompanyPostalCodeVar = template.$('[name=addComplaintCompanyPostalCode]').val();
		   var complaintCompanyWebsiteVar = template.$('[name=addComplaintCompanyWebsite]').val();           

           var isEmpty = false;

			if (!complaintNameVar || complaintNameVar === '') {
            	template.$('[name=addComplaintName]').addClass('error-desc');
            	template.$('[name=addComplaintName]').attr('placeholder', 'Please fill in the Complainant Name');
                var isEmpty = true;
        	}
        	if (!complaintNRICVar || complaintNRICVar === '') {
            	template.$('[name=addComplaintNRIC]').addClass('has-error');
            	template.$('[name=addComplaintNRIC]').attr('placeholder', 'Please fill in the Complainant NRIC');
                var isEmpty = true;
        	}
        	if (!complaintContactVar || complaintContactVar === '') {
            	template.$('[name=addComplaintContact]').addClass('has-error');
            	template.$('[name=addComplaintContact]').attr('placeholder', 'Please fill in the Complainant Contact');
                var isEmpty = true;
        	}
        	if (!complaintEmailVar || complaintEmailVar === '') {
            	template.$('[name=addComplaintEmail]').addClass('has-error');
            	template.$('[name=addComplaintEmail]').attr('placeholder', 'Please fill in the Complainant Email');
                var isEmpty = true;
        	}
        	if (!complaintCompanyVar || complaintCompanyVar === '') {
            	template.$('[name=addComplaintCompany]').addClass('has-error');
            	template.$('[name=addComplaintCompany]').attr('placeholder', 'Please fill in the Complainant Company');
                var isEmpty = true;
        	}
        	if (!complaintCommentsVar || complaintCommentsVar === '') {
            	template.$('[name=addComplaintComments]').addClass('has-error');
            	template.$('[name=addComplaintComments]').attr('placeholder', 'Please fill in the Complainant Comments');
                var isEmpty = true;
        	}
        	if (!complaintFollowUpVar || complaintFollowUpVar === '') {
            	template.$('[name=addComplaintFollowUp]').addClass('has-error');
            	template.$('[name=addComplaintFollowUp]').attr('placeholder', 'Please fill in the Follow Up');
                var isEmpty = true;        	
            }
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Company Address'){
				if (!complaintCompanyAddressVar || complaintCompanyAddressVar === '') {
					template.$('[name=addComplaintCompanyAddress]').addClass('has-error');
					template.$('[name=addComplaintCompanyAddress]').attr('placeholder', 'Please fill in the Company Address');
					var isEmpty = true;        	
				}
				if (!complaintCompanyPostalCodeVar || complaintCompanyPostalCodeVar === '') {
					template.$('[name=addComplaintCompanyPostalCode]').addClass('has-error');
					template.$('[name=addComplaintCompanyPostalCode]').attr('placeholder', 'Please fill in the Company Postal Code');
					var isEmpty = true;        	
				}
			}
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Website'){
				if (!complaintCompanyWebsiteVar || complaintCompanyWebsiteVar === '') {
					template.$('[name=addComplaintCompanyWebsite]').addClass('has-error');
					template.$('[name=addComplaintCompanyWebsite]').attr('placeholder', 'Please fill in the Company Website');
					var isEmpty = true;        	
				}
			}
            if (isEmpty) {
                return;
            };

           var currentUser = Meteor.user();
           var complaintID = complaintsCollection.find().count()+1
           var dateTimeOpen = new Date();

           complaintsCollection.insert({
            complaintID: complaintID,
            complainantName: complaintNameVar,
            complainantNRIC: complaintNRICVar,
            complainantContact: complaintContactVar,
            complainantEmail: complaintEmailVar,
            companyToComplain: complaintCompanyVar,
			companyAddress: complaintCompanyAddressVar,
			companyPostalCode: complaintCompanyPostalCodeVar,
			companyWebsite: complaintCompanyWebsiteVar,
            productCategory: complaintProdCatVar,
            followerUp: complaintFollowUpVar,
            complainantComment: complaintCommentsVar,     	
            managerInstruction: complaintManagerCommentsVar,
            status: "Open",        	
            complaintCreatedBy: currentUser,
            dateTimeOpen: dateTimeOpen,
            dateTimeClose: "" // current time
            });
			
           var minTask = 0;
           var trackManager = "";		  
		   var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();
		   console.log(listOfManager);
		   for(index = 0; index <listOfManager.length; ++index){
				console.log(listOfManager[index]._id);
                var tempCountTask = tasksCollection.find({"managerID":listOfManager[index]._id}).count();
				console.log(tempCountTask);
				trackManager = listOfManager[index]._id;
                if(tempCountTask <= minTask){
                    trackManager = listOfManager[index]._id;
                    minTask = tempCountTask;
                }
		   }
           tasksCollection.insert({
            complaintID: complaintID,
            managerID: trackManager,
            creatorID: Meteor.userId(),
            isViewed: "true"
            })

           var emailMsg = "You have successfully submitted a complaint on CASE Complaint Compliment Management System. Below is your complaint details:";

            Meteor.call('sendEmail',
            complaintEmailVar,
            'ccms@case.com',
            'Dear ' + complaintNameVar,
            emailMsg);

            template.$(".complaintIDPrint").html(complaintID);
            template.$(".complaintTimePrint").html(dateTimeOpen);
            template.$(".complaintNamePrint").html(complaintNameVar);
            template.$(".complaintNRICPrint").html(complaintNRICVar);
            template.$(".complaintContactPrint").html(complaintContactVar);
            template.$(".complaintEmailPrint").html(complaintEmailVar);
            template.$(".complaintCategoryPrint").html(complaintProdCatVar);
            template.$(".complaintCompanyPrint").html(complaintCompanyVar);
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Company Address'){
				template.$(".complaintCompanyAddressDetailsDisplay").removeClass("hide");
				template.$(".complaintCompanyWebsiteDetailsDisplay").addClass("hide");
				template.$(".complaintCompanyAddressPrint").html(complaintCompanyAddressVar);
				template.$(".complaintCompanyPostalCodePrint").html(complaintCompanyPostalCodeVar);
			}else{
				template.$(".complaintCompanyAddressDetailsDisplay").addClass("hide");
				template.$(".complaintCompanyWebsiteDetailsDisplay").removeClass("hide");
				template.$(".complaintCompanyWebsitePrint").html(complaintCompanyWebsiteVar);
			}
            template.$(".complaintCommentPrint").html(complaintCommentsVar);
            template.$(".complaintFollowUpPrint").html(complaintFollowUpVar);
            template.$(".complaintManagerCommentPrint").html(complaintManagerCommentsVar);

            template.$(".complaintForm").addClass("hide");
            template.$(".complaintSubmitted").removeClass("hide");

            template.$("[name=addComplaintName]").val("");
            template.$("[name=addComplaintNRIC]").val("");
            template.$("[name=addComplaintContact]").val("");
            template.$("[name=addComplaintEmail]").val("");
            template.$(".complaintCategory").prop('selectedIndex',0);
            template.$("[name=addComplaintCompany]").val("");			
			template.$(".complaintCompanyAddressOrWebsite").prop('selectedIndex',0);
            template.$("[name=addComplaintComments]").val("");
            template.$("[name=addComplaintFollowUp]").val("");
            template.$("[name=addComplaintManagerComments]").val("");
			template.$('[name=addComplaintCompanyAddress]').val("");
            template.$('[name=addComplaintCompanyPostalCode]').val("");
		    template.$('[name=addComplaintCompanyWebsite]').val(""); 
        },

        'click .resetComplaintBtn':function(event, template){            
            template.$("[name=addComplaintName]").val("");
            template.$("[name=addComplaintNRIC]").val("");
            template.$("[name=addComplaintContact]").val("");
            template.$("[name=addComplaintEmail]").val("");
            template.$(".complaintCategory").prop('selectedIndex',0);
            template.$("[name=addComplaintCompany]").val("");
			template.$(".complaintCompanyAddressOrWebsite").prop('selectedIndex',0);
            template.$("[name=addComplaintComments]").val("");
            template.$("[name=addComplaintFollowUp]").val("");
            template.$("[name=addComplaintManagerComments]").val("");
			template.$('[name=addComplaintCompanyAddress]').val("");
            template.$('[name=addComplaintCompanyPostalCode]').val("");
		    template.$('[name=addComplaintCompanyWebsite]').val("");  
            event.preventDefault();
        },

        'click .newComplaintBtn':function(event, template){            
            event.preventDefault();            
            template.$(".complaintSubmitted").addClass("hide");
            template.$(".complaintForm").removeClass("hide");
        },

        'click .backToHomeBtn':function(event, template){            
            event.preventDefault();
            Router.go('dashboard');
        },
		
		'change .complaintCompanyAddressOrWebsite':function(event, template){            
            if(template.$("[name=addComplaintCompanyLocation]").val() === 'Company Address'){
				template.$(".complaintCompanyAddressDetails").removeClass("hide");
				template.$(".complaintCompanyWebsiteDetails").addClass("hide");
			}else{
				template.$(".complaintCompanyAddressDetails").addClass("hide");
				template.$(".complaintCompanyWebsiteDetails").removeClass("hide");
			}
        }

    });	
}