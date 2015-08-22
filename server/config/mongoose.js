var mongoose = require('mongoose'),
    passport = require('passport');
    LocalPassport = require('passport-local');

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

    var userSchema = mongoose.Schema({
        username: String,
        firstName: String,
        lastName: String
        //salt: String,
        //hashPass: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }
        if (collection.length == 0) {
            User.create({username: 'pan196', fistName: 'Peter', lastName: 'Petrov'});
            User.create({username: 'mincho', firstName: 'Mincho', lastName: 'Minchev'});
            User.create({username: 'doncho', firstName: 'Doncho', lastName: 'Donchov'});
            console.log('Users added to database....');
        }
    });

    passport.use(new LocalPassport(function(username, password, done) {
        User.findOne({ username: username }).exec(function(err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
    }));

    passport.serializeUser(function(user, done) {
        if (user) {
            done(null, user._id);
        }
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({_id: id}).exec(function(err, user) {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
};