if (Meteor.isServer) {
  //nothing
}

if (Meteor.isClient) {

  function getTasksCollectionOfCurrentUser(){
    // console.log(tasksCollection.find({managerID:"gtyF55h3CpqZCeFKz"}).fetch());
    console.log(tasksCollection.find({managerID:Meteor.userId()}).fetch());
    
    return tasksCollection.find({managerID:Meteor.userId()}).fetch();
  }

  Template.viewWorkLists.helpers({    
    getComplaintsCollection: function() {
      var tasks = getTasksCollectionOfCurrentUser();
      // console.log(tasks);
      // var complaints = new Object();
      // var complaintIDArray = tasks.map( function(t) { return t["complaintID"]}); //return array of complaintIDs of this user

      var openTaskArray = [];

      _.each(_.values(tasks), function(task) {
        // console.log(task);
        var complaint = complaintsCollection.findOne({
          complaintID: task.complaintID
        });
        console.log(complaint);
        if (complaint.status == "Open") {
          console.log(openTaskArray)
          openTaskArray.push(complaint.complaintID);
        }
      });
      console.log(openTaskArray);
      return {complaintID:{$in:openTaskArray}} //give the selector in datatable to select only complaintID that are in the complaintIDArray;      
    },

    isManager: function(){
      return Meteor.user().profile.role == "manager";      
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

