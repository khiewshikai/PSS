var mustBeSignedIn = function(pause) {
  if (!(Meteor.user() || Meteor.loggingIn())) {
    Router.go('login');
  }
  this.next();
};

var goToDashboard = function(pause) {
  if (Meteor.user()) {
    Router.go('dashboard');
    this.next();
  }
};

Router.onBeforeAction(mustBeSignedIn, {except: ['login','register','public','complaint','compliment','viewComplaint','viewWorkLists','/editTask/:_id']});
// Router.onBeforeAction(goToDashboard, {only: ['index']});

Router.route('/', {
    name: 'public',
    template: 'public',
    layoutTemplate: 'publicLayout'
});

Router.route('/complaint', {
    name: 'complaint',
    template: 'complaint',
    layoutTemplate: 'publicLayout'
});

Router.route('/compliment', {
    name: 'compliment',
    template: 'compliment',
    layoutTemplate: 'publicLayout'
});

Router.route('/viewComplaint', {
    name: 'viewComplaint',
    template: 'viewComplaint',
    layoutTemplate: 'publicLayout'
});

Router.route('/login', {
    name: 'login',
    template: 'login'
});

Router.route('logout', {
    action: function() {
        Meteor.logout();
        this.redirect('/login');
    }
});

Router.route('/register', {
    name: 'register',
    template: 'register'
});


// pages that requires login
Router.route('/dashboard', {
    name: 'dashboard',
    template: 'dashboard',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/managecomplaints', {
    name: 'manageComplaints',
    template: 'manageComplaints',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/viewWorkLists', {
    name: 'viewWorkLists',
    template: 'viewWorkLists',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/editTask/:_id', {
    name: 'editTask',
    template: 'editTask',
    layoutTemplate: 'dashboardLayout',
    data: function(){
        var complaintOriginalID = this.params._id;
        complaintsCollection.update(
            {_id: this.params._id},
            {
                $set:{isViewed: true}
            }
        )
        console.log(complaintOriginalID);
        return complaintsCollection.findOne({ complaintID: complaintOriginalID });
    }
});

Router.route('/addcomplaints', {
    name: 'addComplaints',
    template: 'addComplaints',
	layoutTemplate: 'dashboardLayout'
});

Router.route('/addCompliments', {
    name: 'addCompliments',
    template: 'addCompliments',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/viewAnalytics', {
    name: 'viewAnalytics',
    template: '/viewAnalytics',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/detailedAnalytics', {
    name: 'detailedAnalytics',
    template: '/detailedAnalytics',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/complaintDetails', {
    name: 'complaintDetails',
    template: '/complaintDetails',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/complimentsDashboard', {
    name: 'complimentsDashboard',
    template: '/complimentsDashboard',
    layoutTemplate: 'dashboardLayout'
});

Router.route('/complimentDetails', {
    name: 'complimentDetails',
    template: '/complimentDetails',
    layoutTemplate: 'dashboardLayout'
});
