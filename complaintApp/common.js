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
  {data: "status", title: "Status", className: "dt-center"},
  {data: "time()", title: "Complain Time", className: "dt-center"},
  {data: 'getManager()', title: "Manager", className: "dt-center"}
  ],
  order: [[ 2, "desc" ]],
  responsive: true,
  autoWidth: false
});


//END dashboard

TabularTables = {};

TabularTables.workLists = new Tabular.Table({
  name: "workLists",
  collection: complaintsCollection,
  columns: [
  {data: "complainantName", title: "Name", className: "dt-center"},
  {data: "complainantNRIC", title: "NRIC", className: "dt-center"},
  {data: "complaintID", title: "Case ID", className: "dt-center"},
  {data: "complainantContact", title: "Contact", className: "dt-center"},
  {data: "complainantEmail", title: "Email", className: "dt-center"},
  {data: "companyToComplain", title: "Company", className: "dt-center"},
  {data: "status", title: "Status", className: "dt-center"},
  {data: "time()", title: "Complain Time", className: "dt-center"},
  ],
  responsive: true,
  autoWidth: false,
  createdRow: function( row, data, dataIndex ) {
    var complaintIDToSearch = parseInt($('td:eq(2)',row).text());
    var taskObjArr = tasksCollection.find({complaintID: complaintIDToSearch}).fetch();
    // console.log(taskObj);

    taskObjArr.forEach(function(element,index){
      // console.log(element.isViewed);
      if(element.isViewed == false){
        $(row).addClass("info");//current row
      }
    })    
  }
});


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
  ],
  responsive: true,
  autoWidth: false
});

Meteor.users.allow({
 remove: function(userid){
   return true;
 }
})



//for viewCompanyComplaint page
TabularTables.complaintsCountCollection = new Tabular.Table({
  name: "complaintsCountCollection",
  collection: complaintsCountCollection,
  columns: [
  {data: "_id", title: "Company", className: "dt-center"},
  {data: "count", title: "No. of Complaint", className: "dt-center"},
  {data: "isEnabled", title: "Publish", className: "dt-center"}
  ],
  responsive: true,
  autoWidth: false,
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
  order: [[ 1, "desc" ]],
  responsive: true,
  autoWidth: false
});

logCollection.helpers({
  findName: function () {
    var user = Meteor.users.findOne({_id: this.userId});
    return user && user.username;
  }
});

TabularTables.logCollection = new Tabular.Table({
  name: "logCollection",
  collection: logCollection,
  extraFields: ['userId'],
  columns: [
  {data: "findName()", title: "User", className: "dt-center"},
  {
    data: "timestamp", 
    title: "Time", 
    className: "dt-center",
    render: function (val, type, doc) {
      if (val instanceof Date) {
        return moment(val);
      } else {
        return "Never";
      }
    }
  },
  {data: "category", title: "Category", className: "dt-center"},
  {data: "text", title: "Text", className: "dt-center"}
  ],
  order: [[ 1, "desc" ]],
  responsive: true,
  autoWidth: false
});
//complaintsCollection tabular table helpers
complaintsCollection.helpers({
  getManager: function () {
    console.log(this._id);
    var caseID = complaintsCollection.findOne({_id: this._id}).complaintID
	if(tasksCollection.findOne({complaintID:caseID}) === undefined){
		console.log("TWESSSSSSSSSSSSSSS")
		return "";
	}
    var managerID = tasksCollection.findOne({complaintID:caseID}).managerID
	
    console.log(caseID);
    console.log(managerID);
    var managerName = Meteor.users.findOne({_id: managerID}).username;
    //var complaintID = complaintsCollection.findOne({_id: this._id})
    console.log(caseID);
    console.log(managerID);
    console.log(managerName);
    return managerName;
  },

  time: function(){
    console.log(this)
    var timeStr = String(complaintsCollection.findOne({_id:this._id}).dateTimeOpen)
    console.log(timeStr)
    return timeStr.substring(0,24);
  }
});
