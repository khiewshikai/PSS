Template.complimentsDashboard.helpers({
	userRole: function() {
		return Meteor.user().profile.role;
	}
});

Template.complimentsDashboard.events({
    "click #fullComplimentTable tbody tr": function(e, template){
        //getting case ID of selected row
        var caseIdSelected = e.currentTarget.cells[2].textContent;
        Session.set("selectedComplimentID", caseIdSelected);
        //console.log("session value: "+Session.get("selectedComplimentID"));
        Router.go('/complimentDetails');
    },

        'click .newComplimentBtn':function(event, template){
			Router.go('/addcompliments');
        }       
});

Template.complimentsDashboard.onRendered(function(){
    $("#complimentsDownloadButton").click(function() {
        $("#fullComplimentTable_wrapper").children().first().attr("id", "complimentfirstDiv");
        $("#fullComplimentTable_wrapper").children().last().attr("id", "complimentlastDiv");
        tableToPDF();
    });

    function tableToPDF() {
        var pdf = new jsPDF('p', 'pt', 'letter');
        // source can be HTML-formatted string, or a reference
        // to an actual DOM element from which the text will be scraped.
        source = $('#fullComplimentTable_wrapper')[0];

    

        // we support special element handlers. Register them with jQuery-style 
        // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
        // There is no support for any other type of selectors 
        // (class, of compound) at this time.
        var specialElementHandlers = {
            '#complimentfirstDiv': function(element, renderer){
                return true;
            },
            '#complimentlastDiv': function(element, renderer){
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