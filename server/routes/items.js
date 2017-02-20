var routes = function(routes) {
    var itemController = require('../controllers/itemController');

    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    routes.get('/', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });
    });

    routes.route('/items/:itemId')

    .get(function(req, res) {
        itemController.retrieveItem(req.params.itemId)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    })

    .delete(function(req, res) {
        itemController.deleteItem(req.params.itemId)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    })

    .put(function(req, res) {
        itemController.updateItem(req.params.itemId, req.body)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    });

    routes.post('/items', function(req, res) {
        itemController.createItem(req.body)
            .then(function(response) {
                res.json({ result: response, uri: req.route.path });
            })
            .catch(function(error) {
                res.status(400).json({ result: error, uri: req.route.path });
            });
    });
};

module.exports = routes;