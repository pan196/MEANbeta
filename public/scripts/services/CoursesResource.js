app.factory('CoursesResource', function($resource) {
    var CoursesResource = $resource('/api/courses/:id', {id: '@id'},
        {
            update: {
                method: 'PUT',
                isArray: false
            }
        });

    CoursesResource.prototype.isAdmin = function() {
        return this.roles && this.roles.indexOf('admin') > -1;
    };

    return CoursesResource;
});