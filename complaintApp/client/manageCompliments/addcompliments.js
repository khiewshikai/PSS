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
			var complimentCompanyAddressVar = template.$('[name=addComplimentCompanyAddress]').val();
            var complimentCompanyPostalCodeVar = template.$('[name=addComplimentCompanyPostalCode]').val();
            var complimentCompanyWebsiteVar = template.$('[name=addComplimentCompanyWebsite]').val(); 

            var isEmpty = false;

            clearComplimentValidate(template);

            if (!complimentNameVar || complimentNameVar === '') {
            	template.$('[name=addComplimentName]').closest(".form-group").addClass('has-error');
            	template.$('[name=addComplimentName]').next().html('Please fill in the Complimenant Name');
            	var isEmpty = true;
            }
            if (!complimentNRICVar || complimentNRICVar === '') {
            	template.$('[name=addComplimentNRIC]').closest(".form-group").addClass('has-error');
            	template.$('[name=addComplimentNRIC]').next().html('Please fill in the Complimenant NRIC');
            	var isEmpty = true;
            }
            var reg = /^\d+$/;
            if (!reg.test(complimentContactVar)) {
                template.$('[name=addComplimentContact]').closest(".form-group").addClass('has-error');
                template.$('[name=addComplimentContact]').next().html('Please enter a valid number');
                var isEmpty = true;
            }
            if (!complimentContactVar || complimentContactVar === '') {
            	template.$('[name=addComplimentContact]').closest(".form-group").addClass('has-error');
            	template.$('[name=addComplimentContact]').next().html('Please fill in the Complimenant Contact');
            	var isEmpty = true;
            }
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if (!re.test(complimentEmailVar)) {
                template.$('[name=addComplimentEmail]').closest(".form-group").addClass('has-error');
                template.$('[name=addComplimentEmail]').next().html('Please fill in a valid Email');
                var isEmpty = true;
            }
            if (!complimentEmailVar || complimentEmailVar === '') {
            	template.$('[name=addComplimentEmail]').closest(".form-group").addClass('has-error');
            	template.$('[name=addComplimentEmail]').next().html('Please fill in the Complimenant Email');
            	var isEmpty = true;
            }
            if (!complimentCompanyVar || complimentCompanyVar === '') {
            	template.$('[name=addComplimentCompany]').closest(".form-group").addClass('has-error');
            	template.$('[name=addComplimentCompany]').next().html('Please fill in the Complimenant Company');
            	var isEmpty = true;
            }
            if (!complimentCommentsVar || complimentCommentsVar === '') {
            	template.$('[name=addComplimentComments]').closest(".form-group").addClass('has-error');
            	template.$('[name=addComplimentComments]').next().html('Please fill in the Complimenant Comments');
            	var isEmpty = true;
            }
            if(template.$("[name=addComplimentCompanyLocation]").val() === 'Company Address'){
                if (!complimentCompanyAddressVar || complimentCompanyAddressVar === '') {
                   template.$('[name=addComplimentCompanyAddress]').closest(".form-group").addClass('has-error');
                   template.$('[name=addComplimentCompanyAddress]').next().html('Please fill in the Company Address');
                   var isEmpty = true;        	
               }
               if (!complimentCompanyPostalCodeVar || complimentCompanyPostalCodeVar === '') {
                   template.$('[name=addComplimentCompanyPostalCode]').closest(".form-group").addClass('has-error');
                   template.$('[name=addComplimentCompanyPostalCode]').next().html('Please fill in the Company Postal Code');
                   var isEmpty = true;        	
               }
           }
           if(template.$("[name=addComplimentCompanyLocation]").val() === 'Website'){
            if (!complimentCompanyWebsiteVar || complimentCompanyWebsiteVar === '') {
               template.$('[name=addComplimentCompanyWebsite]').closest(".form-group").addClass('has-error');
               template.$('[name=addComplimentCompanyWebsite]').next().html('Please fill in the Company Website');
               var isEmpty = true;        	
           }
       }
       if (isEmpty) {
        template.$(".errorForm").removeClass("hide");
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
        companyToCompliment: complimentCompanyVar,
        companyAddress: complimentCompanyAddressVar,
        companyPostalCode: complimentCompanyPostalCodeVar,
        companyWebsite: complimentCompanyWebsiteVar,
        productCategory: complimentProdCatVar,
        complimenantComment: complimentCommentsVar, 	
        complimentCreatedBy: currentUser,
        complimentTimeCreated: dateTimeOpen,
    });

    var emailMsg = 'Dear ' + complimentNameVar + ", you have successfully submitted a compliment on CASE Complaint Compliment Management System. Below is your compliment details.";

    Meteor.call('sendEmail',
        complimentEmailVar,
        'caseccms.heorku.com',
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
    if(template.$("[name=addComplimentCompanyLocation]").val() === 'Company Address'){
        template.$(".complimentCompanyAddressDetailsDisplay").removeClass("hide");
        template.$(".complimentCompanyWebsiteDetailsDisplay").addClass("hide");
        template.$(".complimentCompanyAddressPrint").html(complimentCompanyAddressVar);
        template.$(".complimentCompanyPostalCodePrint").html(complimentCompanyPostalCodeVar);
    }else{
        template.$(".complimentCompanyAddressDetailsDisplay").addClass("hide");
        template.$(".complimentCompanyWebsiteDetailsDisplay").removeClass("hide");
        template.$(".complimentCompanyWebsitePrint").html(complimentCompanyWebsiteVar);
    }

    template.$(".complimentCommentPrint").html(complimentCommentsVar);

    template.$(".complimentForm").addClass("hide");
    template.$(".complimentSubmitted").removeClass("hide");

    template.$("[name=addComplimentName]").val("");
    template.$("[name=addComplimentNRIC]").val("");
    template.$("[name=addComplimentContact]").val("");
    template.$("[name=addComplimentEmail]").val("");
    template.$(".complimentCategory").prop('selectedIndex',0);
    template.$("[name=addComplimentCompany]").val("");			
    template.$(".complimentCompanyAddressOrWebsite").prop('selectedIndex',0);
    template.$("[name=addComplimentComments]").val("");
    template.$('[name=addComplimentCompanyAddress]').val("");
    template.$('[name=addComplimentCompanyPostalCode]').val("");
    template.$('[name=addComplimentCompanyWebsite]').val("");

            // log
            Meteor.call('logger',
                Meteor.user()._id,
                'compliment',
                'added compliment id ' + complimentID);
        },

        'click .resetComplimentBtn':function(event, template){            
            resetComplimentForm(template);
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
        },

        'change .complimentCompanyAddressOrWebsite':function(event, template){            
            if(template.$("[name=addComplimentCompanyLocation]").val() === 'Company Address'){
                template.$(".complimentCompanyAddressDetails").removeClass("hide");
                template.$(".complimentCompanyWebsiteDetails").addClass("hide");
            }else{
                template.$(".complimentCompanyAddressDetails").addClass("hide");
                template.$(".complimentCompanyWebsiteDetails").removeClass("hide");
            }
        }
    });	
}

function resetComplimentForm(template) {
    template.$("[name=addComplimentName]").val("");
    template.$("[name=addComplimentNRIC]").val("");
    template.$("[name=addComplimentContact]").val("");
    template.$("[name=addComplimentEmail]").val("");
    template.$(".complimentCategory").prop('selectedIndex',0);
    template.$("[name=addComplimentCompany]").val("");
    template.$(".complimentCompanyAddressOrWebsite").prop('selectedIndex',0);
    template.$("[name=addComplimentComments]").val("");         
    template.$('[name=addComplimentCompanyAddress]').val("");
    template.$('[name=addComplimentCompanyPostalCode]').val("");
    template.$('[name=addComplimentCompanyWebsite]').val(""); 
    clearComplimentValidate(template);
}

function clearComplimentValidate(template) {
    template.$("[name=addComplimentName]").closest(".form-group").removeClass('has-error');
    template.$("[name=addComplimentNRIC]").closest(".form-group").removeClass('has-error');
    template.$("[name=addComplimentContact]").closest(".form-group").removeClass('has-error');
    template.$("[name=addComplimentEmail]").closest(".form-group").removeClass('has-error');
    template.$(".complimentCategory").closest(".form-group").removeClass('has-error');
    template.$("[name=addComplimentCompany]").closest(".form-group").removeClass('has-error');
    template.$(".complimentCompanyAddressOrWebsite").closest(".form-group").removeClass('has-error');
    template.$("[name=addComplimentComments]").closest(".form-group").removeClass('has-error');         
    template.$('[name=addComplimentCompanyAddress]').closest(".form-group").removeClass('has-error');
    template.$('[name=addComplimentCompanyPostalCode]').closest(".form-group").removeClass('has-error');
    template.$('[name=addComplimentCompanyWebsite]').closest(".form-group").removeClass('has-error'); 

    template.$("[name=addComplimentName]").next().html("");
    template.$("[name=addComplimentNRIC]").next().html("");
    template.$("[name=addComplimentContact]").next().html("");
    template.$("[name=addComplimentEmail]").next().html("");
    template.$(".complimentCategory").next().html("");
    template.$("[name=addComplimentCompany]").next().html("");
    template.$(".complimentCompanyAddressOrWebsite").next().html("");
    template.$("[name=addComplimentComments]").next().html("");         
    template.$('[name=addComplimentCompanyAddress]').next().html("");
    template.$('[name=addComplimentCompanyPostalCode]').next().html("");
    template.$('[name=addComplimentCompanyWebsite]').next().html(""); 

    template.$(".errorForm").addClass("hide");
}