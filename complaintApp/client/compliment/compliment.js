Template.compliment.events({
	'click .onlineBtn':function(event, template){            
		event.preventDefault();
		Router.go('/complimentForm');
	}
});