

Template.dashboard.rendered = function() {
    this.autorun(function(){
        setTimeout(function(){
           $('#table_id').DataTable({}); 
           $('#table_id').removeClass("hide");
        },500);
        console.log("TESTTTTTTTT");
    })
}

if(Meteor.isClient){
    Template.dashboard.helpers({
        "complaints": function(){
            return complaintsCollection.find();
        }
    })


}