

var routes = function (routes) {
  // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
  routes.get('/', function(req, res) {
      res.json({ message: 'hooray! welcome to our api!' });   
  });

  routes.get('/items/:itemId', function(req, res) {
    console.log(req);
    res.json({ result: req.params, uri: req.route.path});
  });

  routes.delete('/items/:itemId', function(req, res) {
    var response = {
      params: req.params
    };
    console.log("Request for deleting item with id: " + req.params.itemId);
    res.json({ result: response, uri: req.route.path});
  });

  routes.put('/items/:itemId', function(req, res) {
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
