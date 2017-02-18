var sequelize = require('../config/db');
var Promise = require('Sequelize').Promise;
var User = sequelize.import('../models/user');
var Controller = {
    createItem: function(user) {
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
    retrieveItem: function(itemId) {
        return new Promise(function(resolve, reject) {
            User.findOne({ where: { userId: itemId }, attributes: ['firstName', ['lastName', 'last_name']] })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error.message);
                });
        });
    },
    updateItem: function(itemId, user) {
        return new Promise(function(resolve, reject) {
            User.update(user, { where: { userId: itemId } })
                .then(function(updateCountList) {
                    resolve(updateCountList[0] + " record(s) updated successfully");
                })
                .catch(function(error) {
                    reject(error.message);
                });
        });
    },
    deleteItem: function(itemId) {
        return new Promise(function(resolve, reject) {
            User.destroy({ where: { userId: itemId } })
                .then(function(deleteCount) {
                    resolve(deleteCount + " record(s) deleted successfully");
                })
                .catch(function(error) {
                    reject(error.message);
                });
        });
    }
};

module.exports = Controller;