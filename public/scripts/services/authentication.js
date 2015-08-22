app.factory('authentication', function($http, $q, identity) {

    return {
        login: function(user) {
            var deferred = $q.defer();

            $http.post('/login', user)
                .success(function(response) {
                    if (response.success) {
                        identity.currentUser = response.user;
                        localStorage.setItem('userData', JSON.stringify(response.user));
                        deferred.resolve(true);
                    } else {
                        deferred.resolve(false);
                    }
                });

            return deferred.promise;
        },
        logout: function() {
            var deferred = $q.defer();

            $http.post('/logout')
                .success(function() {
                    identity.currentUser = undefined;
                    localStorage.removeItem('userData');
                    deferred.resolve();
                });

            return deferred.promise;
        }
    }
});