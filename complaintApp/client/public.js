Template.public.helpers({
  getPublishedComplaints: function() {

    var companyAndComplaintsCount = complaintsCountCollection.find({isEnabled: true}).fetch();
    var companiesCountArr = [];
    if(companyAndComplaintsCount.length > 0){
      companiesCountArr.push(companyAndComplaintsCount[0]._id);        
    }
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