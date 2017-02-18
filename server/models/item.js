module.exports = function(sequelize, Datatype) {
    return sequelize.define('item', {
        itemId: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: Datatype.STRING, allowNull: false },
        description: { type: Datatype.TEXT, allowNull: false },
        userId: {
            type: Datatype.INTEGER,
            references: {
                model: sequelize.model('user'),
                key: 'userId'
            }
        }
    }, {
        freezeTableName: true, // Model tableName will be the same as the model name
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['title']
            }
        ]
    });
};