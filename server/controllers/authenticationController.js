var sequelize = require('../config/db');
var Promise = require('Sequelize').Promise;
var User = sequelize.import('../models/user');
var Controller = {
    validateUser: function(data) {
        return new Promise(function(resolve, reject) {
            User.findOne({
                    attributes: ['loginId', 'firstName', 'middleName', 'lastName'],
                    where: { loginId: data.loginId, password: data.password }
                })
                .then(function(response) {
                    if (response === null) {
                        reject('Invelid user name or password');
                    } else {
                        resolve(response);
                    }
                })
                .catch(function(error) {
                    reject(error.message);
                });
        });
    }
};

module.exports = Controller;