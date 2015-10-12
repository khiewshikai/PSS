Template.complimentsDashboard.events({
    "click #fullComplimentTable tbody tr": function(e, template){
        //getting case ID of selected row
        var caseIdSelected = e.currentTarget.cells[2].textContent;
        Session.set("selectedComplimentID", caseIdSelected);
        //console.log("session value: "+Session.get("selectedComplimentID"));
        Router.go('/complimentDetails');
    }       
});