Template.complimentDetails.helpers({
    "compliment": function(){
    	var complimentID = parseInt(Session.get("selectedComplimentID"));
    	//console.log("details: "+complimentID);
    	if (complimentID){
    		return complimentsCollection.findOne({ComplimenantID: complimentID});
    	}else{
    		Router.go("/complimentsDashboard");
    	}
        
    }
})

Template.complimentDetails.events({
	"click .cmd-backButton":function(e, template){
		Router.go("/complimentsDashboard");
	}
})