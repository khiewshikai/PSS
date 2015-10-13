if (Meteor.isServer) {
  //nothing
}

if (Meteor.isClient) {

  function getTasksCollectionOfCurrentUser(){
    console.log(tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz"}).fetch());
    return tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz"});
  }

  Template.viewWorkLists.helpers({    
    getComplaintsCollection: function() {
      var tasks = getTasksCollectionOfCurrentUser();
      var complaints = new Object();
      var complaintIDArray = tasks.map( function(t) { return t["complaintID"]}); //return array of complaintIDs of this user
      // complaints = complaintsCollection.find({complaintID:{$in:complaintIDArray}});
      // console.log(complaints.fetch());
      return {complaintID:{$in:complaintIDArray}} //give the selector in datatable to select only complaintID that are in the complaintIDArray;      
    },

    isManager: function(){
      return Meteor.user().profile.role == "normal";      
    }
  });

  Template.viewWorkLists.events({
      "click #workListsTable tbody tr": function(e, template){        //getting case ID of selected row
      var _complaintID = e.currentTarget.cells[2].textContent;
      var complaintOriginalID = complaintsCollection.findOne({complaintID: _complaintID})
      console.log(complaintOriginalID);
      Router.go('/editTask/'+ complaintOriginalID);
    }
  })
}

