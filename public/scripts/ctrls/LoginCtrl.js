app.controller('LoginCtrl', function($scope, $http, $location, notifier, identity, authentication) {
    var TOAST_SETTINGS = {
        positionClass: 'toast-bottom-right'
    };
    $scope.identity = identity;
    $scope.login = function(user) {
        authentication.login(user)
            .then(function(success) {
                if (success) {
                    notifier.success('Successful login!', TOAST_SETTINGS);
                } else {
                    notifier.error('Login failed!', TOAST_SETTINGS);
                }
            })
    };

    $scope.logout = function() {
        authentication.logout()
            .then(function(success) {
                notifier.success('Successful sign out!', TOAST_SETTINGS);
                $scope.user = {};
                $location.path('/');
            });

    };
});