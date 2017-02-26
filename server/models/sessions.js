module.exports = function(sequelize, Datatype) {
    return sequelize.define('sessions', {
        sessionId: {
            type: Datatype.UUID,
            defaultValue: Datatype.UUIDV1,
            primaryKey: true
        },
        userId: {
            type: Datatype.INTEGER,
            references: {
                model: sequelize.model('user'),
                key: 'userId'
            }
        }
    }, {
        freezeTableName: true,
        updatedAt: false
    });
};