if(Meteor.isClient){	

	Meteor.call('getCompanyAndComplaintsCount', function(err, data) {
	  if (err)
	    console.log(err);
	  // console.log(data);
	  Session.set('companyAndComplaintsCount', data);
	});

	function populateComplaintCountCollection(){
		var companyAndComplaintsCount = Session.get('companyAndComplaintsCount');
		console.log(companyAndComplaintsCount);
		companyAndComplaintsCount.forEach(function(element,index){
			complaintsCountCollection.update(
			    {_id: element._id},
			    {
			        $set:{			        	
			        	count: element.count,
			        	isEnabled: element.isEnabled
			        }
			    },
			    {upsert: true}
			)			
		});
	}

	Template.viewCompanyComplaint.helpers({	
      	getCompanyComplaintsCount: function() {
      		populateComplaintCountCollection();
      	}

	})

}
