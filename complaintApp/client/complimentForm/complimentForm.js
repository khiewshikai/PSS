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

		clearComplimentValidate(template);

		if (!complimentNameVar || complimentNameVar === '') {
			template.$('.complimenantName').closest(".form-group").addClass('has-error');
			template.$('.complimenantName').next().html('Please fill in the Complainant Name');
			var isEmpty = true;
		}
		if (!complimentNRICVar || complimentNRICVar === '') {
			template.$('.complimenantNRIC').closest(".form-group").addClass('has-error');
			template.$('.complimenantNRIC').next().html('Please fill in the Complainant NRIC');
			var isEmpty = true;
		}
		var reg = /^\d+$/;
		if (!reg.test(complimentContactVar)) {
			template.$('.complimenantContact').closest(".form-group").addClass('has-error');
			template.$('.complimenantContact').next().html('Please enter a valid number');
			var isEmpty = true;
		}
		if (!complimentContactVar || complimentContactVar === '') {
			template.$('.complimenantContact').closest(".form-group").addClass('has-error');
			template.$('.complimenantContact').next().html('Please fill in the Complainant Contact');
			var isEmpty = true;
		}
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (!re.test(complimentEmailVar)) {
			template.$('.complimenantEmail').closest(".form-group").addClass('has-error');
			template.$('.complimenantEmail').next().html('Please fill in a valid Email');
			var isEmpty = true;
		}
		if (!complimentEmailVar || complimentEmailVar === '') {
			template.$('.complimenantEmail').closest(".form-group").addClass('has-error');
			template.$('.complimenantEmail').next().html('Please fill in the Complainant Email');
			var isEmpty = true;
		}
		if (!complimentCompanyVar || complimentCompanyVar === '') {
			template.$('.companyToCompliment').closest(".form-group").addClass('has-error');
			template.$('.companyToCompliment').next().html('Please fill in the Complainant Company');
			var isEmpty = true;
		}
		if (!complimentCommentsVar || complimentCommentsVar === '') {
			template.$('.complimenantComment').closest(".form-group").addClass('has-error');
			template.$('.complimenantComment').next().html('Please fill in the Complainant Comments');
			var isEmpty = true;
		}
		if(template.$(".complimentCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			if (!complimentCompanyAddress || complimentCompanyAddress === '') {
				template.$('.complimentCompanyAddress').closest(".form-group").addClass('has-error');
				template.$('.complimentCompanyAddress').next().html('Please fill in the Company Address');
				var isEmpty = true;        	
			}
			if (!complimentCompanyPostalCode || complimentCompanyPostalCode === '') {
				template.$('.complimentCompanyPostalCode').closest(".form-group").addClass('has-error');
				template.$('.complimentCompanyPostalCode').next().html('Please fill in the Company Postal Code');
				var isEmpty = true;        	
			}
		}
		if(template.$(".complimentCompanyAddressOrWebsite :selected").text() === 'Website'){
			if (!complimentCompanyWebsite || complimentCompanyWebsite === '') {
				template.$('.complimentCompanyWebsite').closest(".form-group").addClass('has-error');
				template.$('.complimentCompanyWebsite').next().html('Please fill in the Company Website');
				var isEmpty = true;        	
			}
		}
		if (isEmpty) {
			template.$(".errorForm").removeClass("hide");
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

		var emailMsg = 'Dear ' + complimentNameVar + ", thank you for submitting your compliment on CASE Complaint Compliment Management System. Below is your compliment details:";

		Meteor.call('sendEmail',
			complimentEmailVar,
			'caseccms.heorku.com',
			'CASE Compliment ID ' + complimentId,
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
		resetComplimentForm(template);
		
		template.$(".complimentForm").addClass("hide");
		template.$(".complimentSubmitted").removeClass("hide");
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
		Router.go('/');
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

function resetComplimentForm(template) {
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
	clearComplimentValidate(template);
}

function clearComplimentValidate(template) {
	template.$('.complimenantName').closest(".form-group").removeClass('has-error');
	template.$('.complimenantNRIC').closest(".form-group").removeClass('has-error');
	template.$('.complimenantContact').closest(".form-group").removeClass('has-error');
	template.$('.complimenantEmail').closest(".form-group").removeClass('has-error');
	template.$('.productCategory').closest(".form-group").removeClass('has-error');
	template.$('.companyToCompliment').closest(".form-group").removeClass('has-error');
	template.$('.complimenantComment').closest(".form-group").removeClass('has-error');
	template.$('.complimentCompanyAddressOrWebsite').closest(".form-group").removeClass('has-error');
	template.$('.complimentCompanyAddress').closest(".form-group").removeClass('has-error');
	template.$('.complimentCompanyPostalCode').closest(".form-group").removeClass('has-error');
	template.$('.complimentCompanyWebsite').closest(".form-group").removeClass('has-error');

	template.$('.complimenantName').next().html("");
	template.$('.complimenantNRIC').next().html("");
	template.$('.complimenantContact').next().html("");
	template.$('.complimenantEmail').next().html("");
	template.$('.productCategory').next().html("");
	template.$('.companyToCompliment').next().html("");
	template.$('.complimenantComment').next().html("");
	template.$('.complimentCompanyAddressOrWebsite').next().html("");
	template.$('.complimentCompanyAddress').next().html("");
	template.$('.complimentCompanyPostalCode').next().html("");
	template.$('.complimentCompanyWebsite').next().html("");

	template.$(".errorForm").addClass("hide");
}