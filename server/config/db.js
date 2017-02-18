var Sequelize = require('sequelize');
var db = require('./config.json').db;

//Setting default values

db.host = db.host ? db.host : '127.0.0.1';
db.port = db.port ? db.port : 3306;

var uri = db.dialect + '://' + db.user + ':' + db.password + '@' + db.host + ':' + db.port + '/' + db.database;
var sequelize = new Sequelize(uri);
module.exports = sequelize;