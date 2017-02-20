var routes = function(routes) {
    var userController = require('../controllers/userController');

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    routes.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    routes.route('/users/:userId')

    .get(function(req, res) {
        userController.retrieveUser(req.params.userId)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    })

    .delete(function(req, res) {
        userController.deleteUser(req.params.userId)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    })

    .put(function(req, res) {
        userController.updateUser(req.params.userId, req.body)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    });

    routes.post('/users', function(req, res) {
        userController.createUser(req.body)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    });
};

module.exports = routes;