Template.public.helpers({
  getPublishedComplaints: function() {

    var companyAndComplaintsCount = complaintsCountCollection.find({isEnabled: true}).fetch();
    console.log(companyAndComplaintsCount);
    var companiesCountArr = [];
    if(companyAndComplaintsCount.length > 0){
      for(var i = 0; i < companyAndComplaintsCount.length;i++){        
          companiesCountArr.push(companyAndComplaintsCount[i]._id);
      }
    }   
    // console.log(companiesCountArr);
    return {_id: {$in:companiesCountArr}};
  }
});


Template.public.events({
  'click .goComplaint':function(event, template){            
    event.preventDefault();
    Router.go('/complaint');
  },

  'click .goCompliment':function(event, template){            
    event.preventDefault();
    Router.go('/compliment');
  },

  'click .goView':function(event, template){            
    event.preventDefault();
    Router.go('/viewComplaint');
  }
});