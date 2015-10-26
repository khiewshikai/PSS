Template.publicLayout.helpers({
	active: function(routeName) {
		var curRoute = Router.current().route.getName();
		return curRoute === routeName ? 'active' : '';
	}
})


Template.publicLayout.events({

	'click .navbar-nav li a':function(event, template) {
		$(".navbar-collapse").collapse('hide');
	}

});