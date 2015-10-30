Template.complaintDetails.rendered = function(){
    var complaintID = parseInt(Session.get("selectedComplaintID"));
    var firstOriginalStatus = complaintsCollection.findOne({complaintID: complaintID}).status
    var userRole = Meteor.user().profile.role;
    //console.log("STATUS: " + complaintsCollection.findOne({complaintID: complaintID}).status)
    if(firstOriginalStatus === "Draft" && userRole != "Clerk"){
        $('.complaintStatus').append('<option>Draft</option>')
        $('.cd-saveDraft').removeClass('hide');
        $('.cd-updateBtn').html('Submit');
        $('.complaintName').prop('disabled', false);
        $('.complaintNRIC').prop('disabled', false);
        $('.complaintContact').prop('disabled', false);
        $('.complaintEmail').prop('disabled', false);
        $('.complaintCategory').prop('disabled', false);
        $('.complaintCompany').prop('disabled', false);
        $('.cd-cat2').removeClass('hide'); 
        $('.cd-cat1').addClass('hide');
        $('.cd-statusGrp').addClass('hide');
        $('.complaintManagerGrp').addClass('hide');

    }
    
    if(userRole === "Clerk" || firstOriginalStatus === "Closed"){
        $('.complaintStatus').prop('disabled', true);
        $('.complaintManager').prop('disabled', true);
        $('.complaintComment').prop('disabled', true);
        $('.complaintStatus').addClass('cd-disabled');
        $('.complaintManager').addClass('cd-disabled');
        $('.complaintComment').addClass('cd-disabled');

        $('.cd-updateBtn').addClass('hide');
    }

    $(".complaintStatus").val(complaintsCollection.findOne({complaintID: complaintID}).status);
    var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();
    //console.log(listOfManager);
    listOfManager.forEach(function(mgr) {
        //console.log(mgr);
        $('.complaintManager').append('<option>'+mgr.username+'</option>')
    })

    var managerIDD = tasksCollection.findOne({complaintID: complaintID}).managerID;
    //console.log(managerIDD);
    var currentMgr = Meteor.users.findOne({_id: managerIDD}).username;
    //console.log(currentMgr);
    $('.complaintManager').val(currentMgr);
}

Template.complaintDetails.helpers({
    "complaints": function(){
    	var complaintID = parseInt(Session.get("selectedComplaintID"));
    	//console.log("details: "+complaintID);
    	if (complaintID){
    		return complaintsCollection.findOne({complaintID: complaintID});
    	}else{
    		Router.go("/dashboard");
    	}
        
    }
})

Template.complaintDetails.events({
    "click .cd-updateBtn": function(e, template){

        toastr.options ={
            "closeButton": true
        } 
        var complaintID = parseInt(Session.get("selectedComplaintID"));
        var firstOriginalStatus = complaintsCollection.findOne({complaintID: complaintID}).status

        if(firstOriginalStatus === "Draft"){
            var caseID = parseInt(template.$(".complaintCaseID").val());
            var managerInstruction = template.$(".complaintComment").val();
            var complaintMongoID = complaintsCollection.findOne({complaintID: caseID});
            var originalManagerInstructions = complaintMongoID.managerInstruction;
            var newStatus = template.$(".complaintStatus").val();
            var orignialStatus = complaintMongoID.status;
            var taskMongoID = tasksCollection.findOne({complaintID: caseID});
            //var managerID = template.$(".complaintManager").val();
            //var managerID2 = Meteor.users.findOne({username: managerID })._id
            //var originalManagerID = taskMongoID.managerID;

            var newName = template.$(".complaintName").val();
            var newNRIC = template.$(".complaintNRIC").val();
            var newContact = template.$(".complaintContact").val();
            var newEmail = template.$(".complaintEmail").val();
            var newCat = template.$(".complaintCategory").val();
            var newCompanyToComplaint = template.$(".complaintCompany").val();

            var isEmpty = false;

            if(newName === ""){
                template.$('.complaintName').attr('placeholder', 'Please fill in the Complainant Name');
                isEmpty = true;
            };
            if(newNRIC === ""){
                template.$('.complaintNRIC').attr('placeholder', 'Please fill in the Complainant NRIC');
                isEmpty = true;
            };
            if(newContact === ""){
                template.$('.complaintContact').attr('placeholder', 'Please fill in the Complainant Contact');
                isEmpty = true;
            };
            if(newEmail === ""){
                template.$('.complaintEmail').attr('placeholder', 'Please fill in the Complainant Email');
                isEmpty = true;
            };
            if(newCat === ""){
                template.$('.complaintCategory').attr('placeholder', 'Please fill in the Complainant Category');
                isEmpty = true;
            };
            if(newCompanyToComplaint === ""){
                template.$('.complaintCompany').attr('placeholder', 'Please fill in the Company to complain');
                isEmpty = true;
            };

            if(isEmpty){
                toastr.warning("Please fill in all the fields.");
                return;
            }

            complaintsCollection.update(
                {_id: complaintMongoID._id},
                {$set: {managerInstruction: managerInstruction, 
                        status: "Open", 
                        complainantName: newName,
                        complainantNRIC: newNRIC,
                        complainantContact: newContact,
                        complainantEmail: newEmail,
                        companyToComplain: newCompanyToComplaint

                }} //need to update timestamp of last edit, but first need to have these attributes at the start when complaints are added. attributes needed: last edited timestamp, last edited user, logging of edits?
            );

            //assign task
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
            newEmail,
            'ccms@case.com',
            'Dear ' + newName,
            emailMsg);

            // tasksCollection.update(
            //     {_id: taskMongoID._id },
            //     {$set: {managerID: managerID2}} //needs to update worklist of manager
            // );
            toastr.info("Record with case ID: " + caseID + " submited.");
            Router.go("/dashboard")

        }else{
            var caseID = parseInt(template.$(".complaintCaseID").val());
            var managerInstruction = template.$(".complaintComment").val();
            var complaintMongoID = complaintsCollection.findOne({complaintID: caseID});
            var originalManagerInstructions = complaintMongoID.managerInstruction;
            var newStatus = template.$(".complaintStatus").val();
            var orignialStatus = complaintMongoID.status;
            var taskMongoID = tasksCollection.findOne({complaintID: caseID});
            var managerID = template.$(".complaintManager").val();
            var managerID2 = Meteor.users.findOne({username: managerID })._id
            var originalManagerID = taskMongoID.managerID;
            //toastr options 
            toastr.options ={
                "closeButton": true
            } 

            console.log(managerInstruction);
            console.log(orignialStatus);
            
            if(originalManagerInstructions === managerInstruction && newStatus === orignialStatus && originalManagerID === managerID2){
                toastr.warning("Please make a change first.");
            }else{
                complaintsCollection.update(
                    {_id: complaintMongoID._id},
                    {$set: {managerInstruction: managerInstruction, status: newStatus}} //need to update timestamp of last edit, but first need to have these attributes at the start when complaints are added. attributes needed: last edited timestamp, last edited user, logging of edits?
                );
                tasksCollection.update(
                    {_id: taskMongoID._id },
                    {$set: {managerID: managerID2}} //needs to update worklist of manager
                );
                toastr.info("Record with case ID: " + caseID + " updated.");
                Router.go("/dashboard");
            }
        }

        
    },

    "click .cd-backButton":function(e, template){
        Router.go("/dashboard");
    },
    "click .cd-saveDraft": function(e, template){
        var caseID = parseInt(template.$(".complaintCaseID").val());
        var managerInstruction = template.$(".complaintComment").val();
        var complaintMongoID = complaintsCollection.findOne({complaintID: caseID});
        var originalManagerInstructions = complaintMongoID.managerInstruction;
        var newStatus = template.$(".complaintStatus").val();
        var orignialStatus = complaintMongoID.status;
        var taskMongoID = tasksCollection.findOne({complaintID: caseID});
        //var managerID = template.$(".complaintManager").val();
        //var managerID2 = Meteor.users.findOne({username: managerID })._id
        //var originalManagerID = taskMongoID.managerID;

        var newName = template.$(".complaintName").val();
        var newNRIC = template.$(".complaintNRIC").val();
        var newContact = template.$(".complaintContact").val();
        var newEmail = template.$(".complaintEmail").val();
        var newCat = template.$(".complaintCategory").val();
        var newCompanyToComplaint = template.$(".complaintCompany").val();

        complaintsCollection.update(
            {_id: complaintMongoID._id},
            {$set: {managerInstruction: managerInstruction, 
                    status: "Draft", 
                    complainantName: newName,
                    complainantNRIC: newNRIC,
                    complainantContact: newContact,
                    complainantEmail: newEmail,
                    companyToComplain: newCompanyToComplaint

            }} //need to update timestamp of last edit, but first need to have these attributes at the start when complaints are added. attributes needed: last edited timestamp, last edited user, logging of edits?
        );

        toastr.info("Record Saved!");
        Router.go("/dashboard");





        ////
        // var caseID = parseInt(template.$(".complaintCaseID").val());
        // var managerInstruction = template.$(".complaintComment").val();
        // var complaintMongoID = complaintsCollection.findOne({complaintID: caseID});
        // var originalManagerInstructions = complaintMongoID.managerInstruction;
        // //var newStatus = template.$(".complaintStatus").val();
        // //var orignialStatus = complaintMongoID.status;
        // var taskMongoID = tasksCollection.findOne({complaintID: caseID});
        // var managerID = template.$(".complaintManager").val();
        // var managerID2 = Meteor.users.findOne({username: managerID })._id
        // var originalManagerID = taskMongoID.managerID;
        // //toastr options 
        // toastr.options ={
        //     "closeButton": true
        // } 

        
        // complaintsCollection.update(
        //     {_id: complaintMongoID._id},
        //     {$set: {managerInstruction: managerInstruction, status: "Draft"}} //need to update timestamp of last edit, but first need to have these attributes at the start when complaints are added. attributes needed: last edited timestamp, last edited user, logging of edits?
        // );
        // // tasksCollection.update(
        // //     {_id: taskMongoID._id },
        // //     {$set: {managerID: managerID2}} //needs to update worklist of manager
        // // );
        // toastr.info("Record Saved!");
        // Router.go("/dashboard");
        
    }

})
