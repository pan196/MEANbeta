var express = require('express');

var env = process.env.NODE_ENV || 'development';

console.log(process);
console.log(process.env);
console.log(process.env.NODE_ENV);

var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport')();
require('./server/config/router')(app);

app.listen(config.PORT);
console.log('Server running on port: ' + config.PORT);
console.log('Environment type: %s', env);