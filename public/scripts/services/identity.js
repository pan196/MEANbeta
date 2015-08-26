app.factory('identity', function(UsersResource) {
    var user;

    if (localStorage.getItem('userData')) {
        user = new UsersResource();
        angular.extend(user, JSON.parse(localStorage.getItem('userData')));
    }

    return {
        currentUser: user,
        isAuthenticated: function() {
            return this.currentUser;
        },
        isAuthForRole: function(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) > -1;
        }
    }
});