Template.login.events({
	'submit form': function(event){
		event.preventDefault();
		var usernameVar = event.target.loginUsername.value;
		var passwordVar = event.target.loginPassword.value;

		Meteor.loginWithPassword(usernameVar, passwordVar, function(error) {
			if(error){
				var errorMsg = "Opps! Incorrect email and/or password.";
				$(".login-info").html(error.reason);
				event.target.loginPassword.value = "";
			} else {
				if (Meteor.user().profile.role == "Manager") {
					Router.go('/viewWorkLists');
				} else {
					Router.go('/dashboard');
				}
		    	// log
		    	Meteor.call('logger',
		    		Meteor.user()._id,
		    		'login',
		    		'Logged in to system');
		    }
		});
	}
});