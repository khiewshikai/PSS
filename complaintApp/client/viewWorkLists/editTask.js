if (Meteor.isServer) {
  //nothing
}

if (Meteor.isClient) {
	function getTasksCollectionOfCurrentUser(){
		return tasksCollection.find({managerID:Meteor.userId()});
	}

	Template.editTask.helpers({
		
    'isTrue': function(){
      return true;
    },
    getComplaintStatus: function(){
      var arr = ["Open", "Processing", "3rd-party","Closed", "Void"];
      // console.log(this.status.text())
      var selected = arr.pop(this.status);
      arr.push(selected);
      // console.log(arr);
      return arr;
    }

  });

	Template.editTask.events({
   "submit .editTask": function (event, template) {
  	  // Prevent default browser form submit
  	  event.preventDefault();
  	  
  	  // Get value from form element
      var caseID = parseInt(template.$(".complaintCaseID").val());
      var followUp = event.target.followUp.value;
      var managerInstruction = event.target.managerInstruction.value.trim();
      var complaintStatus = event.target.complaintStatus.value;

      var originalComplaint = complaintsCollection.findOne({complaintID: caseID});
      var originalManagerInstruction = originalComplaint.managerInstruction;
      var originalFollowUp = originalComplaint.followerUp;
      var originalComplaintStatus = originalComplaint.status;

      //toastr options 
      toastr.options ={
        "closeButton": true
      }      

      if(followUp === originalFollowUp && managerInstruction === originalManagerInstruction && complaintStatus === originalComplaintStatus){
        toastr.warning("Please make a change first.");          
      } else{
        // Insert a task into the collection
        complaintsCollection.update(
          { _id: this._id},
          {
            $set: 
            { 
              followerUp: followUp,
              status: complaintStatus,
              managerInstruction: managerInstruction
            }
          }
          );
        toastr.info("Record with case ID: " + caseID + " updated.");
        Router.go("/viewWorkLists");
      }
      
      if(complaintStatus=="Closed") {
        complaintsCollection.update(
         { _id : this._id },
         {
          $set: 
          { 
           dateTimeClose: new Date()
          }
        }
       )        
      } 

      // log
      Meteor.call('logger',
        Meteor.user()._id,
        'complaint',
        'Updated complaint id ' + this.complaintID);
    },

    "click .cd-backButton":function(e, template){
      Router.go("/viewWorkLists");
    }
  });
}