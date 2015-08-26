app.controller('CoursesCtrl', function($scope, $routeParams, cachedCourses, CoursesResource) {
    $scope.courses = cachedCourses.query();

    //$scope.course = CoursesResource.get({id: $routeParams.id});
    $scope.c = cachedCourses.query().$promise
        .then(function(collection) {
            collection.forEach(function(course) {
                if (course._id === $routeParams.id) {
                    $scope.c = course;
                }
            });
        });
});