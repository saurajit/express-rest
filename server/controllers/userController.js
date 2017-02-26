var sequelize = require('../config/db');
var Promise = require('Sequelize').Promise;
var User = sequelize.import('../models/user');

var Controller = function() {
    return {
        createUser: function(user) {
            return new Promise(function(resolve, reject) {
                User.create(user)
                    .then(function(user) {
                        resolve(user.get());
                    })
                    .catch(function(error) {
                        console.error("%j", error);
                        reject(error.message);
                    });
            });
        },
        retrieveUser: function(userId) {
            return new Promise(function(resolve, reject) {
                User.findOne({ where: { userId: userId }, attributes: ['firstName', ['lastName', 'last_name']] })
                    .then(function(response) {
                        resolve(response);
                    })
                    .catch(function(error) {
                        reject(error.message);
                    });
            });
        },
        updateUser: function(userId, user) {
            return new Promise(function(resolve, reject) {
                User.update(user, { where: { userId: userId } })
                    .then(function(updateCountList) {
                        resolve(updateCountList[0] + " record(s) updated successfully");
                    })
                    .catch(function(error) {
                        reject(error.message);
                    });
            });
        },
        deleteUser: function(userId) {
            return new Promise(function(resolve, reject) {
                User.destroy({ where: { userId: userId } })
                    .then(function(deleteCount) {
                        resolve(deleteCount + " record(s) deleted successfully");
                    })
                    .catch(function(error) {
                        reject(error.message);
                    });
            });
        }
    };
};

module.exports = Controller;