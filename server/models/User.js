var mongoose = require('mongoose'),
    encryption = require('../services/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true },
    firstName: String,
    lastName: String,
    salt: String,
    hashedPass: String,
    roles: [String]
});

userSchema.method({
    verify: function(pass) {
        if (encryption.hashPass(this.salt, pass) === this.hashedPass) {
            return true;
        } else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }
        if (collection.length == 0) {
            var salt;
            var hashedPass;

            salt = encryption.generateSalt();
            hashedPass = encryption.hashPass(salt, 'Peter');
            User.create(
                {
                    username: 'pan196',
                    firstName: 'Peter',
                    lastName: 'Petrov',
                    salt: salt,
                    hashedPass: hashedPass,
                    roles: ['admin']
                }
            );
            salt = encryption.generateSalt();
            hashedPass = encryption.hashPass(salt, 'Mincho');
            User.create(
                {
                    username: 'mincho',
                    firstName: 'Mincho',
                    lastName: 'Minchev',
                    salt: salt,
                    hashedPass: hashedPass,
                    roles: ['standard']
                }
            );
            salt = encryption.generateSalt();
            hashedPass = encryption.hashPass(salt, 'Doncho');
            User.create(
                {
                    username: 'doncho',
                    firstName: 'Doncho',
                    lastName: 'Donchov',
                    salt: salt,
                    hashedPass: hashedPass,
                    roles: ['standard']
                }
            );
            console.log('Users added to database....');
        }
    });
};

