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

Router.onBeforeAction(mustBeSignedIn, {except: ['login','register','public','viewComplaints','viewWorkLists']});
// Router.onBeforeAction(goToDashboard, {only: ['index']});

Router.route('/', {
    name: 'public',
    template: 'public',
    layoutTemplate: 'publicLayout'
});

Router.route('/viewComplaints', {
    name: 'viewComplaints',
    template: 'viewComplaints',
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