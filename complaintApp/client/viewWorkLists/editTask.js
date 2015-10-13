if (Meteor.isServer) {
  //nothing
}

if (Meteor.isClient) {
	

	function getTasksCollectionOfCurrentUser(){
		return tasksCollection.find({managerID:Meteor.userId()});
	}

	Template.editTask.helpers({
		
		getComplaintsCollection: function() {
			var tasks = getTasksCollectionOfCurrentUser();
			var complaints = new Object();
  	  var complaintIDArray = tasks.map( function(t) { return t["complaintID"]}); //return array of complaintIDs of this user
  	  complaints = complaintsCollection.find({"complaintID":{"$in":complaintIDArray}});
  	  return complaints;      
	  },

  	isManager: function(){
  		return Meteor.user().profile.role == "normal";
  	}
  });

	Template.editTask.events({
  		"submit .editTask": function (event) {
  	  // Prevent default browser form submit
  	  event.preventDefault();
  	  
  	  // Get value from form element
  	  var followUp = event.target.followUp.value;
  	  var managerInstruction = event.target.managerInstruction.value;
  	  var complaintStatus = event.target.complaintStatus.value;

      // Insert a task into the collection
      complaintsCollection.update(
        { _id: this.complaintOriginalID},
        {
          $set: 
            { 
              followerUp: followUp,
              status: complaintStatus,
              managerInstruction: managerInstruction
            }
        }
      );

  	  if(complaintStatus=="closed")
  	  {
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
  	  // Clear form
  	  // event.target.text.value = "";
  	}
  });
}