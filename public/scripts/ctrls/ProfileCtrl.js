app.controller('ProfileCtrl', function($scope, $location, notifier, identity, authentication) {
    $scope.user = {
        firstName: identity.currentUser.firstName,
        lastName: identity.currentUser.lastName
    };

    $scope.update = function(user) {
        authentication.update(user)
            .then(function() {
                $scope.firstName = user.firstName;
                $scope.lastName = user.lastName;
                $location.path('/');
            });

    };
});