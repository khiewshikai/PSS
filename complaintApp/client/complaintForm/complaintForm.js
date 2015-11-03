Template.complaintForm.events({
	'click .submitComplaintBtn':function(event, template){
		event.preventDefault();

		// get all the form values
		var complaintName = template.$(".complaintName").val();
		var complaintNRIC = template.$(".complaintNRIC").val();
		var complaintContact = template.$(".complaintContact").val();
		var complaintEmail = template.$(".complaintEmail").val();
		var complaintCategory = template.$(".complaintCategory :selected").text();
		var complaintCompany = template.$(".complaintCompany").val();
		var complaintComment = template.$(".complaintComment").val();
		var complaintCompanyAddressOrWebsite = template.$(".complaintCompanyAddressOrWebsite :selected").text();
		var complaintCompanyAddress = template.$(".complaintCompanyAddress").val();
		var complaintCompanyPostalCode = template.$(".complaintCompanyPostalCode").val();
		var complaintCompanyWebsite = template.$(".complaintCompanyWebsite").val();

		var complaintId = complaintsCollection.find().count() + 1;
		var timeSubmitted = new Date();
		
		// validate form
		var isEmpty = false;

		clearComplaintValidate(template);
		if (!complaintName || complaintName === '') {
			template.$('.complaintName').closest(".form-group").addClass('has-error');
			template.$('.complaintName').next().html('Please fill in the Complainant Name');
			var isEmpty = true;
		}
		if (!complaintNRIC || complaintNRIC === '') {
			template.$('.complaintNRIC').closest(".form-group").addClass('has-error');
			template.$('.complaintNRIC').next().html('Please fill in the Complainant NRIC');
			var isEmpty = true;
		}
		var reg = /^\d+$/;
		if (!reg.test(complaintContact)) {
			template.$('.complaintContact').closest(".form-group").addClass('has-error');
			template.$('.complaintContact').next().html('Please enter a valid number');
			var isEmpty = true;
		}
		if (!complaintContact || complaintContact === '') {
			template.$('.complaintContact').closest(".form-group").addClass('has-error');
			template.$('.complaintContact').next().html('Please fill in the Complainant Contact');
			var isEmpty = true;
		}
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		if (!re.test(complaintEmail)) {
			template.$('.complaintEmail').closest(".form-group").addClass('has-error');
			template.$('.complaintEmail').next().html('Please fill in a valid Email');
			var isEmpty = true;
		}
		if (!complaintEmail || complaintEmail === '') {
			template.$('.complaintEmail').closest(".form-group").addClass('has-error');
			template.$('.complaintEmail').next().html('Please fill in the Complainant Email');
			var isEmpty = true;
		}
		if (!complaintCompany || complaintCompany === '') {
			template.$('.complaintCompany').closest(".form-group").addClass('has-error');
			template.$('.complaintCompany').next().html('Please fill in the Complaint Company');
			var isEmpty = true;
		}
		if (!complaintComment || complaintComment === '') {
			template.$('.complaintComment').closest(".form-group").addClass('has-error');
			template.$('.complaintComment').next().html('Please fill in the Complainant Comments');
			var isEmpty = true;
		}
		if(template.$(".complaintCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			if (!complaintCompanyAddress || complaintCompanyAddress === '') {
				template.$('.complaintCompanyAddress').closest(".form-group").addClass('has-error');
				template.$('.complaintCompanyAddress').next().html('Please fill in the Company Address');
				var isEmpty = true;        	
			}
			if (!complaintCompanyPostalCode || complaintCompanyPostalCode === '') {
				template.$('.complaintCompanyPostalCode').closest(".form-group").addClass('has-error');
				template.$('.complaintCompanyPostalCode').next().html('Please fill in the Company Postal Code');
				var isEmpty = true;        	
			}
		}
		if(template.$(".complaintCompanyAddressOrWebsite :selected").text() === 'Website'){
			if (!complaintCompanyWebsite || complaintCompanyWebsite === '') {
				template.$('.complaintCompanyWebsite').closest(".form-group").addClass('has-error');
				template.$('.complaintCompanyWebsite').next().html('Please fill in the Company Website');
				var isEmpty = true;        	
			}
		}
		if (isEmpty) {
			template.$(".errorForm").removeClass("hide");
			return;
		};

		// insert into collection
		complaintsCollection.insert({
			complaintID: complaintId,
			complainantName: complaintName,
			complainantNRIC: complaintNRIC,			
			complainantContact: complaintContact,
			complainantEmail: complaintEmail,
			companyToComplain: complaintCompany,
			companyAddress: complaintCompanyAddress,
			companyPostalCode: complaintCompanyPostalCode,
			companyWebsite: complaintCompanyWebsite,
			productCategory: complaintCategory,
			followerUp: "N/A",
			complainantComment: complaintComment,
			managerInstruction: "Case will be investigated",
			status: "Open",
			dateTimeOpen: timeSubmitted,
			dateTimeClose: "N/A"
		});
		
		// assign manager
		var countTaskManager = [];
		var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();
		
		for(index = 0; index < listOfManager.length; index++){
			console.log(listOfManager[index]._id);
			var tempCountTask = tasksCollection.find({"managerID":listOfManager[index]._id}).count();
			countTaskManager.push(tempCountTask);
		}
		
		console.log(countTaskManager);
		var minNum = Math.min.apply(Math, countTaskManager);
		console.log(minNum);
		
		for(index = 0; index < listOfManager.length; index++){
			var tempCountTask = tasksCollection.find({"managerID":listOfManager[index]._id}).count();
			if(tempCountTask == minNum){
				trackManager = listOfManager[index]._id;
				break;
			}
		}
		
		tasksCollection.insert({
			complaintID: complaintId,
			managerID: trackManager,
			creatorID: Meteor.userId(),
			isViewed: false
		})

		var emailMsg = 'Dear ' + complaintName + ", you have successfully submitted a complaint on CASE Complaint Compliment Management System. Below is your complaint details:";

		Meteor.call('sendEmail',
			complaintEmail,
			'ccms@case.com',
			'CASE Complaint ID ' + complaintId,
			emailMsg);


		// add to print
		template.$(".complaintIDPrint").html(complaintId);
		template.$(".complaintTimePrint").html(timeSubmitted);
		template.$(".complaintNamePrint").html(complaintName);
		template.$(".complaintNRICPrint").html(complaintNRIC);
		template.$(".complaintContactPrint").html(complaintContact);
		template.$(".complaintEmailPrint").html(complaintEmail);
		template.$(".complaintCategoryPrint").html(complaintCategory);
		template.$(".complaintCompanyPrint").html(complaintCompany);
		template.$(".complaintCommentPrint").html(complaintComment);
		
		if(template.$(".complaintCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			template.$(".complaintCompanyAddressDetailsDisplay").removeClass("hide");
			template.$(".complaintCompanyWebsiteDetailsDisplay").addClass("hide");
			template.$(".complaintCompanyAddressPrint").html(complaintCompanyAddress);
			template.$(".complaintCompanyPostalCodePrint").html(complaintCompanyPostalCode);
		}else{
			template.$(".complaintCompanyAddressDetailsDisplay").addClass("hide");
			template.$(".complaintCompanyWebsiteDetailsDisplay").removeClass("hide");
			template.$(".complaintCompanyWebsitePrint").html(complaintCompanyWebsite);
		}

		// reset form
		resetComplaintForm(template);

		template.$(".complaintForm").addClass("hide");
		template.$(".complaintSubmitted").removeClass("hide");
	},

	'click .resetComplaintBtn':function(event, template){
		
		resetComplaintForm(template);

		event.preventDefault();
	},

	'click .newComplaintBtn':function(event, template){            
		event.preventDefault();            
		template.$(".complaintSubmitted").addClass("hide");
		template.$(".complaintForm").removeClass("hide");
	},

	'click .backToHomeBtn':function(event, template){            
		event.preventDefault();
		Router.go('/');
	},

	'change .complaintCompanyAddressOrWebsite':function(event, template){            
		if(template.$(".complaintCompanyAddressOrWebsite :selected").text() === 'Company Address'){
			template.$(".complaintCompanyAddressDetails").removeClass("hide");
			template.$(".complaintCompanyWebsiteDetails").addClass("hide");
		}else{
			template.$(".complaintCompanyAddressDetails").addClass("hide");
			template.$(".complaintCompanyWebsiteDetails").removeClass("hide");
		}
	}
});

function resetComplaintForm(template) {
	template.$(".complaintName").val("");
	template.$(".complaintNRIC").val("");
	template.$(".complaintContact").val("");
	template.$(".complaintEmail").val("");
	template.$(".complaintCategory").prop('selectedIndex',0);
	template.$(".complaintCompany").val("");
	template.$(".complaintComment").val("");		
	template.$(".complaintCompanyAddressOrWebsite").prop('selectedIndex',0);
	template.$(".complaintCompanyAddress").val("");
	template.$(".complaintCompanyPostalCode").val("");
	template.$(".complaintCompanyWebsite").val("");
	clearComplaintValidate(template);
}

function clearComplaintValidate(template) {
	template.$('.complaintName').closest(".form-group").removeClass('has-error');
	template.$('.complaintNRIC').closest(".form-group").removeClass('has-error');
	template.$('.complaintContact').closest(".form-group").removeClass('has-error');
	template.$('.complaintEmail').closest(".form-group").removeClass('has-error');
	template.$('.complaintCategory').closest(".form-group").removeClass('has-error');
	template.$('.complaintCompany').closest(".form-group").removeClass('has-error');
	template.$('.complaintComment').closest(".form-group").removeClass('has-error');
	template.$('.complaintCompanyAddressOrWebsite').closest(".form-group").removeClass('has-error');
	template.$('.complaintCompanyAddress').closest(".form-group").removeClass('has-error');
	template.$('.complaintCompanyPostalCode').closest(".form-group").removeClass('has-error');
	template.$('.complaintCompanyWebsite').closest(".form-group").removeClass('has-error');

	template.$('.complaintName').next().html("");
	template.$('.complaintNRIC').next().html("");
	template.$('.complaintContact').next().html("");
	template.$('.complaintEmail').next().html("");
	template.$('.complaintCategory').next().html("");
	template.$('.complaintCompany').next().html("");
	template.$('.complaintComment').next().html("");
	template.$('.complaintCompanyAddressOrWebsite').next().html("");
	template.$('.complaintCompanyAddress').next().html("");
	template.$('.complaintCompanyPostalCode').next().html("");
	template.$('.complaintCompanyWebsite').next().html("");

	template.$(".errorForm").addClass("hide");
}