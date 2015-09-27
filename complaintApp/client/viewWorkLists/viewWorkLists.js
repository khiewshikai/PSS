if (Meteor.isServer) {
  //nothing
}

if (Meteor.isClient) {
  function getTasksCollectionOfCurrentUser(){
    return tasksCollection.find({managerID:Meteor.userId()});
  }

  Template.viewWorkLists.helpers({
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
}