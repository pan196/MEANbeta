app.factory('identity', function() {

    return {
        currentUser: JSON.parse(localStorage.getItem('userData')),
        isAuthenticated: function() {
            return this.currentUser;
        }
    }
});