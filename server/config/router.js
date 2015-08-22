var passport = require('passport'),
    authentication = require('./authentication');

module.exports = function(app) {
    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('partials/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', authentication.login);
    app.post('/logout', authentication.logout);

    app.get('*', function (req, res) {
        res.render('index');
    });

    app.locals.pretty = true;
};