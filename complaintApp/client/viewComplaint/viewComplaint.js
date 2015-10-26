Template.viewComplaint.events({
	'click .viewComplaintBtn':function(event, template) {
		event.preventDefault();

		var caseID = template.$(".caseId").val();
		var caseNRIC = template.$(".caseNRIC").val();

		var complaint = complaintsCollection.findOne({complaintID: parseInt(caseID), complainantNRIC: caseNRIC});
		
		if (complaint) {
			template.one.set(complaint.complaintID);
			template.two.set(complaint.dateTimeOpen);
			template.three.set(complaint.status);
			template.four.set(complaint.complainantName);
			template.five.set(complaint.complainantNRIC);
			template.six.set(complaint.complainantContact);
			template.seven.set(complaint.complainantEmail);
			template.eight.set(complaint.productCategory);
			template.nine.set(complaint.companyToComplain);
			template.ten.set(complaint.complainantComment);
		}
		

		// reset form
		template.$(".caseId").val("");
		template.$(".caseNRIC").val("");
		template.$(".caseId").blur();
		template.$(".caseNRIC").blur();

		template.$(".searchResult").removeClass("hide");
	}
});

Template.viewComplaint.created = function() {
	this.complaint = new ReactiveVar({});
	this.one = new ReactiveVar("");
	this.two = new ReactiveVar("");
	this.three = new ReactiveVar("");
	this.four = new ReactiveVar("");
	this.five = new ReactiveVar("");
	this.six = new ReactiveVar("");
	this.seven = new ReactiveVar("");
	this.eight = new ReactiveVar("");
	this.nine = new ReactiveVar("");
	this.ten = new ReactiveVar("");
}

Template.viewComplaint.helpers({
	// reactive var
	complaint: function() {
		return Template.instance().complaint.get();
	},

	// reactive var
	one: function() {
		return Template.instance().one.get();
	},

	// reactive var
	two: function() {
		return Template.instance().two.get();
	},

	// reactive var
	three: function() {
		return Template.instance().three.get();
	},

	// reactive var
	four: function() {
		return Template.instance().four.get();
	},

	// reactive var
	five: function() {
		return Template.instance().five.get();
	},

	// reactive var
	six: function() {
		return Template.instance().six.get();
	},

	// reactive var
	seven: function() {
		return Template.instance().seven.get();
	},

	// reactive var
	eight: function() {
		return Template.instance().eight.get();
	},

	// reactive var
	nine: function() {
		return Template.instance().nine.get();
	},

	// reactive var
	ten: function() {
		return Template.instance().ten.get();
	}

});