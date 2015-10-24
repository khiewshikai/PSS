if (Meteor.isClient) {

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
    
}