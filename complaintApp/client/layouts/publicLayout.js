Template.publicLayout.helpers({
    active: function(routeName) {
        var curRoute = Router.current().route.getName();
        return curRoute === routeName ? 'active' : '';
    }
})