var Course = require('mongoose').model('Course');

module.exports = {
    getCourseById: function(req, res, next) {
        Course.findOne({_id: req.params.id})
            .exec(function(err, course) {
                if (err) {
                    console.log('Courses could not be loaded: ' + err);
                } else {
                    res.send(course);
                }
            });
    },
    getAllCourses: function(req, res, next) {
        Course.find({}, function(err, collection) {
            if (err) {
                console.log('Courses could not be loaded: ' + err);
            }
            res.send(collection);
        });

    }
};