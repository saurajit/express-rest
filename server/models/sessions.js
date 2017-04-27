module.exports = function(sequelize, Datatype) {
    return sequelize.define('sessions', {
        sessionId: {
            type: Datatype.UUID,
            defaultValue: Datatype.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: Datatype.INTEGER,
            references: {
                model: sequelize.model('user'),
                key: 'userId'
            },
            allowNull: false
        },
        loggedIn: {
            type: Datatype.DATE,
            defaultValue: Datatype.NOW(),
            allowNull: false
        }
    }, {
        createdAt: false,
        freezeTableName: true,
        updatedAt: false
    });
};