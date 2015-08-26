app.factory('cachedCourses', function(CoursesResource) {
    var cachedCourses;

    return {
        query: function() {
            if (!cachedCourses) {
                cachedCourses = CoursesResource.query();
            }

            return cachedCourses;
        }
    }
});