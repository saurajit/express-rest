var Sequelize = require('sequelize');
var db = require('../config/config.json').db;

//Setting default values

db.host = db.host ? db.host : '127.0.0.1';
db.port = db.port ? db.port : 3306;

var uri = db.dialect + '://' + db.user + ':' + db.password + '@' + db.host + ':' + db.port + '/' + db.database;
var sequelize = new Sequelize(uri);

var User = sequelize.import('../models/user');
sequelize.import('../models/user');
sequelize.import('../models/item');
sequelize.import('../models/sessions');

sequelize.sync({ force: true }).then(function() {
    // Table created
    return User.create({
            loginId: 'admin',
            firstName: 'Administrator',
            password: "admin"
        })
        .then(function(user) {
            console.log(user.getDataValue('password'));
        })
        .catch(function(error) {
            console.log(error);
        });
});