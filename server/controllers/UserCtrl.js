var encryption = require('../services/encryption'),
    User = require('mongoose').model('User');


module.exports = {
    createUser: function(req, res) {
        var userData = req.body;
        userData.salt = encryption.generateSalt();
        userData.hashedPass = encryption.hashPass(userData.salt, userData.password);
        User.create(userData, function(err, user) {
            if (err) {
                console.log('Failed to register new user! ' + err);
                return;
            }
            req.logIn(user, function(err) {
                if (err) {
                    res.status(400);
                    return res.send({reason: err.toString()});
                }
                res.send({success: true, user: user})
            })
        });
    },
    updateUser: function(req, res, next) {
        console.log(req.body._id);
        console.log(req.user._id);
        if (req.user._id == req.body._id
            || req.user.roles.indexOf('admin') > -1) {

            var userData = req.body;
            if (userData.password) {
                userData.salt = encryption.generateSalt();
                userData.hashedPass = encryption.hashPass(userData.salt, userData.password);
                User.update({_id: req.body._id}, userData, function() {
                    res.end();
                });
            } else {
                User.update({_id: req.body._id}, userData, function() {
                    res.end();
                });
                res.send(userData)
            }
        }


    },
    getAllUsers: function(req, res) {
        User.find({}, function(err, collection) {
            if (err) {
                console.log('Users could not be loaded: ' + err);
            }
            res.send(collection);
        });
    }
};