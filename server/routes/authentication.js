var routes = function(routes) {
    var authController = require('../controllers/authenticationController');

    routes.post('/authenticate', function(req, res) {
        authController.validateUser(req.body)
            .then(function(response) {
                res.setHeader('X-Auth-Token', response.loginId)
                    .json({ result: response, uri: req.route.path });
            })
            .error(function(error) {
                res.status(401).json({ result: error, uri: req.route.path });
            });
    });
};

module.exports = routes;