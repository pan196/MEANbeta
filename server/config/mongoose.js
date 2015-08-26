var mongoose = require('mongoose'),
    User = require('../models/User'),
    Course = require('../models/Course');

module.exports = function(config) {
    mongoose.connect(config.DATABASE);

    var database = mongoose.connection;

    database.once('open', function(err) {
        if (err) {
            console.log('Database could not be opened:\n' + err);
            return;
        }
        console.log('Database up and running...');
    });

    database.on('error', function(err) {
        console.log('Database error:\n' + err);
    });

    User.seedInitialUsers();
    Course.seedInitialCourses();
};