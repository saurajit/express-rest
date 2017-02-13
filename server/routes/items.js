var routes = function (routes) {
  var itemController = require('../controllers/itemController');

  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  routes.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });   
  });

  routes.route('/items/:itemId')

  .get(function(req, res) {
    itemController.saveItem("Test");
    res.json({ result: req.params, uri: req.route.path});
  })

  .delete(function(req, res) {
    var response = {
      params: req.params
    };
    console.log("Request for deleting item with id: " + req.params.itemId);
    res.json({ result: response, uri: req.route.path});
  })

  .put(function(req, res) {
    var response = {
      params: req.params,
      body: req.body
    };
    console.log("Request for updating item with id: " + req.params.itemId);
    res.json({ result: response, uri: req.route.path});
  });

  routes.post('/items', function(req, res) {
    var response = {
      body: req.body
    };
    console.log("Request for creating an item");
    res.json({ result: response, uri: req.route.path});
  });
};

module.exports = routes;