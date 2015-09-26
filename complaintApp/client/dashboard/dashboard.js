Template.dashboard.rendered = function() {
	//initialize data table
    $('#table_id').DataTable({
    	"language": {
	      "emptyTable": ""
	    }
    });
    //check if collection has stuff
    if(complaintsCollection.find().count() === 0){
    	var toInsert = [{
    		name: "Ali",
    		nric: "S1234567D",
    		caseID: "123",
    		contact: "91234567",
    		email: "aaa@email.com",
    		company: "ZULU",
    		status: "Open"
    	},
    	{
    		name: "baba",
    		nric: "S1234567E",
    		caseID: "456",
    		contact: "61234578",
    		email: "bbb@email.com",
    		company: "Jelo",
    		status: "Pending"
    	},
    	{
    		name: "caca",
    		nric: "S1234567F",
    		caseID: "789",
    		contact: "636666991",
    		email: "ccc@email.com",
    		company: "omg",
    		status: "Close"
    	}]

    	_.each(toInsert, function(data){
    		complaintsCollection.insert(data)
    	})
    	
    }
}

if(Meteor.isClient){
	Template.dashboard.helpers({
		"complaints": function(){
			return complaintsCollection.find();
		}
	})


}