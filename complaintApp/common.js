//For table tables, refer to: https://github.com/aldeed/meteor-tabular 
//Start dashboard
TabularTables = {};

TabularTables.complaintsCollection = new Tabular.Table({
  name: "complaintsCollection",
  collection: complaintsCollection,
  columns: [
    {data: "complainantName", title: "Name", className: "dt-center"},
    {data: "complainantNRIC", title: "NRIC", className: "dt-center"},
    {data: "complaintID", title: "Case ID", className: "dt-center"},
    {data: "complainantContact", title: "Contact", className: "dt-center"},
    {data: "complainantEmail", title: "Email", className: "dt-center"},
    {data: "companyToComplain", title: "Company", className: "dt-center"},
    {data: "status", title: "Status", className: "dt-center"}
  ]
});
//END dashboard

//Start complimentsDashboard
TabularTables.complimentsCollection = new Tabular.Table({
	name: "complimentsCollection",
	collection: complimentsCollection,
	columns: [
		{data: "complimenantName", title: "Name", className: "dt-center"},
    {data: "complimenantNRIC", title: "NRIC", className: "dt-center"},
    {data: "complimenantID", title: "Case ID", className: "dt-center"},
    {data: "complimenantContact", title: "Contact", className: "dt-center"},
    {data: "complimenantEmail", title: "Email", className: "dt-center"},
    {data: "companyToCompliment", title: "Company", className: "dt-center"}
	]
});


//for viewCompanyComplaint page
TabularTables.complaintsCountCollection = new Tabular.Table({
  name: "complaintsCountCollection",
  collection: complaintsCountCollection,
  columns: [
    {data: "_id", title: "Company", className: "dt-center"},
    {data: "count", title: "No. of Complaint", className: "dt-center"},
    {data: "isEnabled", title: "Publish", className: "dt-center"}
  ],
  order: [[ 1, "desc" ]],
  createdRow: function( row, data, dataIndex ) {
    // set row class based on row data
    var companyName = $('td:eq(0)',row).text();
    var complaintCountObj = complaintsCountCollection.find({_id: companyName}).fetch();
    if(complaintCountObj[0].isEnabled == true){
      $('td:eq(2)', row).html('<input id="toggle-one" checked type="checkbox" data-size="small">');
    }
    else{
      $('td:eq(2)', row).html('<input id="toggle-one" type="checkbox" data-size="small">');
    }
    
    $('#toggle-one',row).bootstrapToggle({
        on: 'Yes',
        off: 'No'
    });
    
    $('.toggle',row).click(function(){      
      var companyName = $(this).parent().parent().children().eq(0).text();
      var classList = $(this).attr('class').split(/\s+/);
      var gonnaPublish = classList.indexOf("off") != -1;

      if(gonnaPublish == true){
        complaintsCountCollection.update(
            {_id: companyName},
            {
                $set:{                
                  isEnabled: true
                }
            },
            {upsert: true}
        )        
      }
      else{
        complaintsCountCollection.update(
            {_id: companyName},
            {
                $set:{                
                  isEnabled: false
                }
            },
            {upsert: true}
        )
      }
    })
  }
});

TabularTables.complaintsCountCollectionPublic = new Tabular.Table({
  name: "complaintsCountCollectionPublic",
  collection: complaintsCountCollection,
  columns: [
    {data: "_id", title: "Company", className: "dt-center"},
    {data: "count", title: "No. of Complaint", className: "dt-center"}
  ],
  order: [[ 1, "desc" ]]
});