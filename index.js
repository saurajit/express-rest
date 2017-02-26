// server.js

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

require('./server/config/db');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

require('./server/routes/users')(router);
require('./server/routes/items')(router);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.json({ error: 'Invalid request' })
        .end();
    next(err);
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started at port ' + port);