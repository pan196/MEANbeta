app.factory('authentication', function($http, $q, identity, UsersResource) {

    return {
        register: function(user) {
            var deferred = $q.defer();

            var userResource = new UsersResource(user);

            userResource.$save().then(function() {
                identity.currentUser = userResource.user;
                localStorage.setItem('userData', JSON.stringify(userResource.user));
                deferred.resolve();
            }, function(responce) {
                deferred.reject(responce);
            });

            return deferred.promise;
        },
        login: function(user) {
            var deferred = $q.defer();

            $http.post('/login', user)
                .success(function(response) {
                    if (response.success) {
                        var user = new UsersResource();
                        angular.extend(user, response.user);
                        identity.currentUser = user;
                        localStorage.setItem('userData', JSON.stringify(user));

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
        },
        update: function(user) {
            var deferred = $q.defer();

            user = new UsersResource(user);
            user._id = identity.currentUser._id;
            user.$update().then(function() {
                identity.currentUser = user;
                localStorage.setItem('userData', JSON.stringify(user));
                deferred.resolve();
            }, function(responce) {
                deferred.reject(responce)
            });

            return deferred.promise;
        },
        isAuth: function() {
            if (identity.isAuthenticated()) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        },
        isInRole: function(role) {
            if (identity.isAuthForRole(role)) {
                return true;
            } else {
                return $q.reject('not authorized');
            }
        }
    }
});