var mongoose = require('mongoose'),
    passport = require('passport'),
    crypto = require('crypto'),
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
        lastName: String,
        salt: String,
        hashedPass: String
    });

    userSchema.method({
        verify: function(pass) {
            if (hashPass(this.salt, pass) === this.hashedPass) {

            }
        }
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }
        if (collection.length == 0) {
            var salt;
            var hashedPass;

            salt = generateSalt();
            hashedPass = hashPass(salt, 'Peter');
            User.create({username: 'pan196', firstName: 'Peter', lastName: 'Petrov', salt: salt, hashedPass: hashedPass});
            salt = generateSalt();
            hashedPass = hashPass(salt, 'Mincho');
            User.create({username: 'mincho', firstName: 'Mincho', lastName: 'Minchev', salt: salt, hashedPass: hashedPass});
            salt = generateSalt();
            hashedPass = hashPass(salt, 'Doncho');
            User.create({username: 'doncho', firstName: 'Doncho', lastName: 'Donchov', salt: salt, hashedPass: hashedPass});
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

function generateSalt() {
    return crypto.randomBytes(128).toString('base64');
}

function hashPass(salt, pass) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pass).digest('hex');
}

