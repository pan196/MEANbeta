var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        ROOT_PATH: rootPath,
        DATABASE: 'mongodb://localhost/testDb',
        PORT: process.env.PORT || 3030
    },
    production: {
        ROOT_PATH: rootPath,
        DATABASE: 'mongodb://admin:kostaa@ds055822.mongolab.com:55822/testdb',
        PORT: process.env.PORT || 3030
    }
};