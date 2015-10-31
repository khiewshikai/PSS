if (Meteor.isServer) {
  //nothing
}

if (Meteor.isClient) {

  function getTasksCollectionOfCurrentUser(){
    // console.log(tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz"}).fetch());
    return tasksCollection.find({managerID:Meteor.userId()});
  }

  Template.viewWorkLists.helpers({    
    getComplaintsCollection: function() {
      var tasks = getTasksCollectionOfCurrentUser();
      var complaints = new Object();
      var complaintIDArray = tasks.map( function(t) { return t["complaintID"]}); //return array of complaintIDs of this user
      return {complaintID:{$in:complaintIDArray}} //give the selector in datatable to select only complaintID that are in the complaintIDArray;      
    },

    isManager: function(){
      return Meteor.user().profile.role == "normal";      
    }
  });

  Template.viewWorkLists.events({
      "click #workListsTable tbody tr": function(e, template){        //getting case ID of selected row
      var _complaintID = parseInt(e.currentTarget.cells[2].textContent);
      var complaintOriginalID = complaintsCollection.findOne({complaintID: _complaintID})._id
      Router.go('/editTask/'+ complaintOriginalID);
    }
  })
}

