Template.register.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var usernameVar = event.target.registerUsername.value;
		var passwordVar = event.target.registerPassword.value;
		var roleVar = template.$(".registerRole :selected").text();

		Accounts.createUser({
			username: usernameVar,
			password: passwordVar,
			profile: {
				name: "to be set",
				role: roleVar
			}
		}, function(error) {
			if(error){
				if (error.reason == "Need to set a username or email") {
					$(".login-info").html("Need to set a username");
				} else {
					$(".login-info").html(error.reason);
				}
			} else {
		        // Redirect user if registration succeeds
		        Router.go('/dashboard');
		    }
		});
	}
});