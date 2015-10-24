Template.complaintDetails.rendered = function(){
    var complaintID = parseInt(Session.get("selectedComplaintID"));
    //console.log("STATUS: " + complaintsCollection.findOne({complaintID: complaintID}).status)
    $(".complaintStatus").val(complaintsCollection.findOne({complaintID: complaintID}).status);
    var listOfManager = Meteor.users.find({'profile.role':'Manager'}).fetch();
    listOfManager.forEach(function(mgr) {
        //console.log(mgr);
        $('.complaintManager').append('<option>'+mgr.username+'</option>')
        var managerID = tasksCollection.findOne({complaintID: complaintID}).managerID;
        var currentMgr = Meteor.users.findOne({_id: managerID}).username;
        //console.log(currentMgr);
        $('.complaintManager').val(currentMgr);
    })
    
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
        var caseID = parseInt(template.$(".complaintCaseID").val());
        var managerInstruction = template.$(".complaintComment").val();
        var complaintMongoID = complaintsCollection.findOne({complaintID: caseID});
        var originalManagerInstructions = complaintMongoID.managerInstruction;
        var newStatus = template.$(".complaintStatus").val();
        var orignialStatus = complaintMongoID.status;
        var taskMongoID = tasksCollection.findOne({complaintID: caseID});
        var managerID = template.$(".complaintManager").val();
        var originalManagerID = taskMongoID.managerID;
        //toastr options 
        toastr.options ={
            "closeButton": true
        } 

        console.log(managerInstruction);
        console.log(orignialStatus);
        
        if(originalManagerInstructions === managerInstruction && newStatus === orignialStatus && originalManagerID === managerID){
            toastr.warning("Please make a change first.");
        }else{
            complaintsCollection.update(
                {_id: complaintMongoID._id},
                {$set: {managerInstruction: managerInstruction, status: newStatus}} //need to update timestamp of last edit, but first need to have these attributes at the start when complaints are added. attributes needed: last edited timestamp, last edited user, logging of edits?
            );
            tasksCollection.update(
                {_id: taskMongoID._id },
                {$set: {managerID: managerID}}
            );
            toastr.info("Record with case ID: " + caseID + " updated.");
            Router.go("/dashboard");
        }
    },

    "click .cd-backButton":function(e, template){
        Router.go("/dashboard");
    }
})
