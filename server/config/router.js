var authentication = require('./authentication'),
    Controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/users', authentication.isInRole('admin'), Controllers.User.getAllUsers);
    app.post('/api/users', Controllers.User.createUser);
    app.put('/api/users', authentication.isAuthenticated, Controllers.User.updateUser);

    app.get('/api/courses', Controllers.Course.getAllCourses);
    app.get('/api/courses/:id', Controllers.Course.getCourseById);
    //app.post('/api/courses');
    //app.put('/api/courses');

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('partials/' + req.params.partialArea + '/' + req.params.partialName)
    });

    app.post('/login', authentication.login);
    app.post('/logout', authentication.logout);

    app.get('api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function (req, res) {
        res.render('index');
    });

    app.locals.pretty = true;
};