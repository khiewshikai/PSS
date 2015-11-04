
// Template.dashboard.helpers({
//     "userID": function(){
//         console.log(Meteor.userId());
//         return Meteor.users.findOne(Meteor.userId()).profile.role;
//     }
// });
Template.dashboard.helpers({
	userRole: function() {
		return Meteor.user().profile.role;
	},
    getManager: function(id){
        var caseMondoID = complaintsCollection.findOne({complaintID: id})._id;
        var managerMongoID = tasksCollection.findOne({_id: caseMondoID}).managerID;
        return Meteor.users.findOne({_id: managerName}).profile.name;
    }
});

Template.dashboard.events({
    "click #fullTable tbody tr": function(e, template){
        //getting case ID of selected row
        var caseIdSelected = e.currentTarget.cells[2].textContent;
        Session.set("selectedComplaintID", caseIdSelected);
        //console.log(Session.get("selectedComplaintID"));
        Router.go('/complaintDetails');
    },

	'click .newComplaintBtn':function(event, template){
		Router.go('/addComplaints');
	}
});

Template.dashboard.onRendered(function(){
    $("#downloadButton").click(function() {
        $("#fullTable_wrapper").children().first().attr("id", "firstDiv");
        $("#fullTable_wrapper").children().last().attr("id", "lastDiv");
        tableToPDF();
    });

    function tableToPDF() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('#fullTable_wrapper')[0];

    

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        var specialElementHandlers = {
            '#firstDiv': function(element, renderer){
                return true;
            },
            '#lastDiv': function(element, renderer){
                return true;
            }
        };

        margins = {
            top: 80,
            bottom: 60,
            left: 40,
            width: 522
        };
        // all coords and widths are in jsPDF instance's declared units
        // 'inches' in this case
        pdf.fromHTML(
            source, // HTML string or DOM elem ref.
            margins.left, // x coord
            margins.top, { // y coord
                'width': margins.width, // max width of content on PDF
                'elementHandlers': specialElementHandlers
        },

        function (dispose) {
            // dispose: object with X, Y of the last line add to the PDF 
            //          this allow the insertion of new lines after html
            pdf.save('Test.pdf');
        }, margins);
    }    
});

