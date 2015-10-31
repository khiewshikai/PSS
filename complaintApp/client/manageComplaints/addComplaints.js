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

			clearComplaintValidate(template);

			if (!complaintNameVar || complaintNameVar === '') {
				template.$('[name=addComplaintName]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintName]').attr('placeholder', 'Please fill in the Complainant Name');
				var isEmpty = true;
			}
			if (!complaintNRICVar || complaintNRICVar === '') {
				template.$('[name=addComplaintNRIC]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintNRIC]').attr('placeholder', 'Please fill in the Complainant NRIC');
				var isEmpty = true;
			}
			if (!complaintContactVar || complaintContactVar === '') {
				template.$('[name=addComplaintContact]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintContact]').attr('placeholder', 'Please fill in the Complainant Contact');
				var isEmpty = true;
			}
			if (!complaintEmailVar || complaintEmailVar === '') {
				template.$('[name=addComplaintEmail]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintEmail]').attr('placeholder', 'Please fill in the Complainant Email');
				var isEmpty = true;
			}
			if (!complaintCompanyVar || complaintCompanyVar === '') {
				template.$('[name=addComplaintCompany]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintCompany]').attr('placeholder', 'Please fill in the Complainant Company');
				var isEmpty = true;
			}
			if (!complaintCommentsVar || complaintCommentsVar === '') {
				template.$('[name=addComplaintComments]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintComments]').attr('placeholder', 'Please fill in the Complainant Comments');
				var isEmpty = true;
			}
			if (!complaintFollowUpVar || complaintFollowUpVar === '') {
				template.$('[name=addComplaintFollowUp]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintFollowUp]').attr('placeholder', 'Please fill in the Follow Up');
				var isEmpty = true;          
			}
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Company Address'){
				if (!complaintCompanyAddressVar || complaintCompanyAddressVar === '') {
					template.$('[name=addComplaintCompanyAddress]').closest(".form-group").addClass('has-error');
					template.$('[name=addComplaintCompanyAddress]').attr('placeholder', 'Please fill in the Company Address');
					var isEmpty = true;          
				}
				if (!complaintCompanyPostalCodeVar || complaintCompanyPostalCodeVar === '') {
					template.$('[name=addComplaintCompanyPostalCode]').closest(".form-group").addClass('has-error');
					template.$('[name=addComplaintCompanyPostalCode]').attr('placeholder', 'Please fill in the Company Postal Code');
					var isEmpty = true;          
				}
			}
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Website'){
				if (!complaintCompanyWebsiteVar || complaintCompanyWebsiteVar === '') {
					template.$('[name=addComplaintCompanyWebsite]').closest(".form-group").addClass('has-error');
					template.$('[name=addComplaintCompanyWebsite]').attr('placeholder', 'Please fill in the Company Website');
					var isEmpty = true;          
				}
			}
			if (isEmpty) {
				template.$(".errorForm").removeClass("hide");
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

			//reset
			resetComplaintForm(template);

			// log
			Meteor.call('logger',
				Meteor.user()._id,
				'complaint',
				'Added new complaint id ' + complaintID);
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
		},

		'click .saveAsDraftComplaintBtn': function(event, template) {
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

			var isEmpty = 0;

			clearComplaintValidate(template);

			if (!complaintNameVar || complaintNameVar === '') {
				template.$('[name=addComplaintName]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintName]').attr('placeholder', 'Please fill in the Complainant Name');
				isEmpty ++;
			}
			if (!complaintNRICVar || complaintNRICVar === '') {
				template.$('[name=addComplaintNRIC]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintNRIC]').attr('placeholder', 'Please fill in the Complainant NRIC');
				isEmpty ++;
			}
			if (!complaintContactVar || complaintContactVar === '') {
				template.$('[name=addComplaintContact]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintContact]').attr('placeholder', 'Please fill in the Complainant Contact');
				isEmpty ++;
			}
			if (!complaintEmailVar || complaintEmailVar === '') {
				template.$('[name=addComplaintEmail]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintEmail]').attr('placeholder', 'Please fill in the Complainant Email');
				isEmpty ++;
			}
			if (!complaintCompanyVar || complaintCompanyVar === '') {
				template.$('[name=addComplaintCompany]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintCompany]').attr('placeholder', 'Please fill in the Complainant Company');
				isEmpty ++;
			}
			if (!complaintCommentsVar || complaintCommentsVar === '') {
				template.$('[name=addComplaintComments]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintComments]').attr('placeholder', 'Please fill in the Complainant Comments');
				isEmpty ++;
			}
			if (!complaintFollowUpVar || complaintFollowUpVar === '') {
				template.$('[name=addComplaintFollowUp]').closest(".form-group").addClass('has-error');
				template.$('[name=addComplaintFollowUp]').attr('placeholder', 'Please fill in the Follow Up');
				isEmpty ++;         
			}
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Company Address'){
				if (!complaintCompanyAddressVar || complaintCompanyAddressVar === '') {
					template.$('[name=addComplaintCompanyAddress]').closest(".form-group").addClass('has-error');
					template.$('[name=addComplaintCompanyAddress]').attr('placeholder', 'Please fill in the Company Address');
					isEmpty ++;         
				}
				if (!complaintCompanyPostalCodeVar || complaintCompanyPostalCodeVar === '') {
					template.$('[name=addComplaintCompanyPostalCode]').closest(".form-group").addClass('has-error');
					template.$('[name=addComplaintCompanyPostalCode]').attr('placeholder', 'Please fill in the Company Postal Code');
					isEmpty ++;         
				}
			}
			if(template.$("[name=addComplaintCompanyLocation]").val() === 'Website'){
				if (!complaintCompanyWebsiteVar || complaintCompanyWebsiteVar === '') {
					template.$('[name=addComplaintCompanyWebsite]').closest(".form-group").addClass('has-error');
					template.$('[name=addComplaintCompanyWebsite]').attr('placeholder', 'Please fill in the Company Website');
					isEmpty ++;        
				}
			}
			console.log(isEmpty);
			if (isEmpty === 9) {
				toastr.warning("Please fill in at least a field to save as draft");
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
				status: "Draft",         
				complaintCreatedBy: currentUser,
				dateTimeOpen: dateTimeOpen,
			dateTimeClose: "" // current time
		});

		   // log
		   Meteor.call('logger',
		   	Meteor.user()._id,
		   	'complaint',
		   	'Saved as draft complaint id ' + complaintID);

		   // var minTask = 0;
		   // var trackManager = "";         
		   // var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();
		   // console.log(listOfManager);
		   // for(index = 0; index <listOfManager.length; ++index){
		   //      console.log(listOfManager[index]._id);
		   //      var tempCountTask = tasksCollection.find({"managerID":listOfManager[index]._id}).count();
		   //      console.log(tempCountTask);
		   //      trackManager = listOfManager[index]._id;
		   //      if(tempCountTask <= minTask){
		   //          trackManager = listOfManager[index]._id;
		   //          minTask = tempCountTask;
		   //      }
		   // }
		   // tasksCollection.insert({
		   //  complaintID: complaintID,
		   //  managerID: trackManager,
		   //  creatorID: Meteor.userId(),
		   //  isViewed: "true"
		   //  })

		   // var emailMsg = "You have successfully submitted a complaint on CASE Complaint Compliment Management System. Below is your complaint details:";

		   //  Meteor.call('sendEmail',
		   //  complaintEmailVar,
		   //  'ccms@case.com',
		   //  'Dear ' + complaintNameVar,
		   //  emailMsg);

		   //  template.$(".complaintIDPrint").html(complaintID);
		   //  template.$(".complaintTimePrint").html(dateTimeOpen);
		   //  template.$(".complaintNamePrint").html(complaintNameVar);
		   //  template.$(".complaintNRICPrint").html(complaintNRICVar);
		   //  template.$(".complaintContactPrint").html(complaintContactVar);
		   //  template.$(".complaintEmailPrint").html(complaintEmailVar);
		   //  template.$(".complaintCategoryPrint").html(complaintProdCatVar);
		   //  template.$(".complaintCompanyPrint").html(complaintCompanyVar);
		   //  if(template.$("[name=addComplaintCompanyLocation]").val() === 'Company Address'){
		   //      template.$(".complaintCompanyAddressDetailsDisplay").removeClass("hide");
		   //      template.$(".complaintCompanyWebsiteDetailsDisplay").addClass("hide");
		   //      template.$(".complaintCompanyAddressPrint").html(complaintCompanyAddressVar);
		   //      template.$(".complaintCompanyPostalCodePrint").html(complaintCompanyPostalCodeVar);
		   //  }else{
		   //      template.$(".complaintCompanyAddressDetailsDisplay").addClass("hide");
		   //      template.$(".complaintCompanyWebsiteDetailsDisplay").removeClass("hide");
		   //      template.$(".complaintCompanyWebsitePrint").html(complaintCompanyWebsiteVar);
		   //  }
		   //  template.$(".complaintCommentPrint").html(complaintCommentsVar);
		   //  template.$(".complaintFollowUpPrint").html(complaintFollowUpVar);
		   //  template.$(".complaintManagerCommentPrint").html(complaintManagerCommentsVar);

		   //  template.$(".complaintForm").addClass("hide");
		   //  template.$(".complaintSubmitted").removeClass("hide");

		   //  template.$("[name=addComplaintName]").val("");
		   //  template.$("[name=addComplaintNRIC]").val("");
		   //  template.$("[name=addComplaintContact]").val("");
		   //  template.$("[name=addComplaintEmail]").val("");
		   //  template.$(".complaintCategory").prop('selectedIndex',0);
		   //  template.$("[name=addComplaintCompany]").val("");           
		   //  template.$(".complaintCompanyAddressOrWebsite").prop('selectedIndex',0);
		   //  template.$("[name=addComplaintComments]").val("");
		   //  template.$("[name=addComplaintFollowUp]").val("");
		   //  template.$("[name=addComplaintManagerComments]").val("");
		   //  template.$('[name=addComplaintCompanyAddress]').val("");
		   //  template.$('[name=addComplaintCompanyPostalCode]').val("");
		   //  template.$('[name=addComplaintCompanyWebsite]').val(""); 
		   Router.go("/dashboard");
		   toastr.info("Record Saved!");
		}

	});  
}

function resetComplaintForm(template) {
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
	clearComplaintValidate(template);
}

function clearComplaintValidate(template) {
	template.$("[name=addComplaintName]").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintNRIC]").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintContact]").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintEmail]").closest(".form-group").removeClass('has-error');
	template.$(".complaintCategory").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintCompany]").closest(".form-group").removeClass('has-error');
	template.$(".complaintCompanyAddressOrWebsite").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintComments]").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintFollowUp]").closest(".form-group").removeClass('has-error');
	template.$("[name=addComplaintManagerComments]").closest(".form-group").removeClass('has-error');
	template.$('[name=addComplaintCompanyAddress]').closest(".form-group").removeClass('has-error');
	template.$('[name=addComplaintCompanyPostalCode]').closest(".form-group").removeClass('has-error');
	template.$('[name=addComplaintCompanyWebsite]').closest(".form-group").removeClass('has-error'); 

	template.$(".errorForm").addClass("hide");
}