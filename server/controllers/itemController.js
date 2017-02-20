var sequelize = require('../config/db');
var Promise = require('Sequelize').Promise;
var Item = sequelize.import('../models/item');
var Controller = {
    createItem: function(item) {
        return new Promise(function(resolve, reject) {
            item.userId = 1;
            Item.create(item)
                .then(function(item) {
                    resolve(item.get());
                })
                .catch(function(error) {
                    console.error("%j", error);
                    reject(error.message);
                });
        });
    },
    retrieveItem: function(itemId) {
        return new Promise(function(resolve, reject) {
            Item.findOne({ where: { itemId: itemId } })
                .then(function(response) {
                    resolve(response);
                })
                .catch(function(error) {
                    reject(error.message);
                });
        });
    },
    updateItem: function(itemId, item) {
        return new Promise(function(resolve, reject) {
            item.userId = 1;
            Item.update(item, { where: { itemId: itemId } })
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
            Item.destroy({ where: { itemId: itemId } })
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