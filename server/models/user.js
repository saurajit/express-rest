module.exports = function(sequelize, Datatype) {
    return sequelize.define('user', {
        userId: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        loginId: { type: Datatype.STRING, allowNull: false, unique: true },
        firstName: { type: Datatype.STRING, allowNull: false },
        middleName: { type: Datatype.STRING, allowNull: false, defaultValue: '' },
        lastName: { type: Datatype.STRING, allowNull: false },
        password: {
            type: Datatype.STRING,
            set: function(val) {
                this.setDataValue('password', val + ' testing');
            },
            allowNull: false
        }
    }, {
        timestamps: false,
        freezeTableName: true, // Model tableName will be the same as the model name
        indexes: [
            // Create a unique index on email
            {
                unique: true,
                fields: ['loginId']
            }
        ],
        instanceMethods: {
            getUserId: function() {
                return this.userId;
            }
        }
    });
};