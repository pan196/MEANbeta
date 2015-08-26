app.controller('SignUpCtrl', function($scope, $location, authentication, notifier) {
    var TOAST_SETTINGS = {
        positionClass: 'toast-bottom-right'
    };

    $scope.register = function(user) {
        authentication.register(user)
            .then(function() {
                notifier.success('Successful registration!', TOAST_SETTINGS);
                $location.path('/');
            });
    }
});