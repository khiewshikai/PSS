
// Template.dashboard.helpers({
//     "userID": function(){
//         console.log(Meteor.userId());
//         return Meteor.users.findOne(Meteor.userId()).profile.role;
//     }
// });

Template.dashboard.events({
    "click #fullTable tbody tr": function(e, template){
        //getting case ID of selected row
        var caseIdSelected = e.currentTarget.cells[2].textContent;
        Session.set("selectedComplaintID", caseIdSelected);
        //console.log(Session.get("selectedComplaintID"));
        Router.go('/complaintDetails');
    }       
});

