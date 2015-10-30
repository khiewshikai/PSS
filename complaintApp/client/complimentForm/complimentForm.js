Template.complimentForm.events({
	'click .submitComplimentBtn':function(event, template){
		event.preventDefault();

		var complimentNameVar = template.$(".complimenantName").val();
		var complimentNRICVar = template.$(".complimenantNRIC").val();
		var complimentContactVar = template.$(".complimenantContact").val();
		var complimentEmailVar = template.$(".complimenantEmail").val();
		var complimentProdCatVar = template.$(".productCategory :selected").text();
		var complimentCompanyVar = template.$(".companyToCompliment").val();
		var complimentCommentsVar = template.$(".complimenantComment").val();
		var complimentCompanyAddressOrWebsite = template.$(".complimentCompanyAddressOrWebsite :selected").text();
		var complimentCompanyAddress = template.$(".complimentCompanyAddress").val();
		var complimentCompanyPostalCode = template.$(".complimentCompanyPostalCode").val();
		var complimentCompanyWebsite = template.$(".complimentCompanyWebsite").val();

		var complimentId = complimentsCollection.find().count() + 1;
		var timeSubmitted = new Date();

		var isEmpty = false;

		if (!complimentNameVar || complimentNameVar === '') {
			template.$('.complimenantName').addClass('error-desc');
			template.$('.complimenantName').attr('placeholder', 'Please fill in the Complainant Name');
			var isEmpty = true;
		}
		if (!complimentNRICVar || complimentNRICVar === '') {
			template.$('.complimenantNRIC').addClass('has-error');
			template.$('.complimenantNRIC').attr('placeholder', 'Please fill in the Complainant NRIC');
			var isEmpty = true;
		}
		if (!complimentContactVar || complimentContactVar === '') {
			template.$('.complimenantContact').addClass('has-error');
			template.$('.complimenantContact').attr('placeholder', 'Please fill in the Complainant Contact');
			var isEmpty = true;
		}
		if (!complimentEmailVar || complimentEmailVar === '') {
			template.$('.complimenantEmail').addClass('has-error');
			template.$('.complimenantEmail').attr('placeholder', 'Please fill in the Complainant Email');
			var isEmpty = true;
		}
		if (!complimentCompanyVar || complimentCompanyVar === '') {
			template.$('.companyToCompliment').addClass('has-error');
			template.$('.companyToCompliment').attr('placeholder', 'Please fill in the Complainant Company');
			var isEmpty = true;
		}
		if (!complimentCommentsVar || complimentCommentsVar === '') {
			template.$('.complimenantComment').addClass('has-error');
			template.$('.complimenantComment').attr('placeholder', 'Please fill in the Complainant Comments');
			var isEmpty = true;
		}
		if(template.$(".complimentCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			if (!complimentCompanyAddress || complimentCompanyAddress === '') {
				template.$('.complimentCompanyAddress').addClass('has-error');
				template.$('.complimentCompanyAddress').attr('placeholder', 'Please fill in the Company Address');
				var isEmpty = true;        	
			}
			if (!complimentCompanyPostalCode || complimentCompanyPostalCode === '') {
				template.$('.complimentCompanyPostalCode').addClass('has-error');
				template.$('.complimentCompanyPostalCode').attr('placeholder', 'Please fill in the Company Postal Code');
				var isEmpty = true;        	
			}
		}
		if(template.$(".complimentCompanyAddressOrWebsite :selected").text() === 'Website'){
			if (!complimentCompanyWebsite || complimentCompanyWebsite === '') {
				template.$('.complimentCompanyWebsite').addClass('has-error');
				template.$('.complimentCompanyWebsite').attr('placeholder', 'Please fill in the Company Website');
				var isEmpty = true;        	
			}
		}
		if (isEmpty) {
			return;
		};
		
		complimentsCollection.insert({
			complimenantID: complimentId,
			complimenantName: complimentNameVar,
			complimenantNRIC: complimentNRICVar,
			complimenantContact: complimentContactVar,
			complimenantEmail: complimentEmailVar,
			companyToCompliment:complimentCompanyVar,
			companyAddress: complimentCompanyAddress,
			companyPostalCode: complimentCompanyPostalCode,
			companyWebsite: complimentCompanyWebsite,
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
		
		if(template.$(".complimentCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			template.$(".complimentCompanyAddressDetailsDisplay").removeClass("hide");
			template.$(".complimentCompanyWebsiteDetailsDisplay").addClass("hide");
			template.$(".complimentCompanyAddressPrint").html(complimentCompanyAddress);
			template.$(".complimentCompanyPostalCodePrint").html(complimentCompanyPostalCode);
		}else{
			template.$(".complimentCompanyAddressDetailsDisplay").addClass("hide");
			template.$(".complimentCompanyWebsiteDetailsDisplay").removeClass("hide");
			template.$(".complimentCompanyWebsitePrint").html(complimentCompanyWebsite);
		}

		// reset form
		template.$(".complimenantName").val("");
		template.$(".complimenantNRIC").val("");
		template.$(".complimenantContact").val("");
		template.$(".complimenantEmail").val("");
		template.$(".productCategory").prop('selectedIndex',0);
		template.$(".companyToCompliment").val("");
		template.$(".complimenantComment").val("");
		template.$(".complimentCompanyAddressOrWebsite").prop('selectedIndex',0);
		template.$(".complimentCompanyAddress").val("");
		template.$(".complimentCompanyPostalCode").val("");
		template.$(".complimentCompanyWebsite").val("");
		
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
		template.$(".complimentCompanyAddressOrWebsite").prop('selectedIndex',0);
		template.$(".complimentCompanyAddress").val("");
		template.$(".complimentCompanyPostalCode").val("");
		template.$(".complimentCompanyWebsite").val("");

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
		if(template.$(".complimentCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			template.$(".complimentCompanyAddressDetails").removeClass("hide");
			template.$(".complimentCompanyWebsiteDetails").addClass("hide");
		}else{
			template.$(".complimentCompanyAddressDetails").addClass("hide");
			template.$(".complimentCompanyWebsiteDetails").removeClass("hide");
		}
	}
});