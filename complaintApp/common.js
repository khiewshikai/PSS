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
		{data: "ComplimenantName", title: "Name", className: "dt-center"},
	    {data: "ComplimenantNRIC", title: "NRIC", className: "dt-center"},
	    {data: "ComplimenantID", title: "Case ID", className: "dt-center"},
	    {data: "ComplimenantContact", title: "Contact", className: "dt-center"},
	    {data: "ComplimenantEmail", title: "Email", className: "dt-center"},
	    {data: "companyToCompliment", title: "Company", className: "dt-center"}
	]
});