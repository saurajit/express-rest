// server.js

// call the packages we need
var path = require('path');
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

require('./server/routes/authentication')(router);

// route middleware to verify a token
router.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['X-Auth-Token'];

    // decode token
    if (token) {
        res.status(200).send({
            error: 'Token provided.'
        });
        next();
    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            error: 'No token provided.'
        });
    }
});

require('./server/routes/users')(router);
require('./server/routes/items')(router);

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.use(express.static(path.join(__dirname, '/public')));
// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    if (req.url === '/favicon.ico') {
        res.end();
    } else {
        var err = new Error('Not Found');
        err.status = 404;
        res.json({ error: 'Invalid request' })
            .end();
        next(err);
    }
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server started at port ' + port);