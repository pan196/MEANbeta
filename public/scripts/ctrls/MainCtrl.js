app.controller('MainCtrl', function($scope, cachedCourses) {
    $scope.hello = 'Hi from angular!';
    $('#toast-container').addClass('toast-bottom-right');
    $scope.courses = cachedCourses.query();
});