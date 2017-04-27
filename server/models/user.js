module.exports = function(sequelize, Datatype) {
    var salt = "hello";
    return sequelize.define('user', {
        userId: { type: Datatype.INTEGER, primaryKey: true, autoIncrement: true },
        loginId: { type: Datatype.STRING, allowNull: false, unique: true },
        firstName: { type: Datatype.STRING, allowNull: false },
        middleName: { type: Datatype.STRING, allowNull: false, defaultValue: '' },
        lastName: { type: Datatype.STRING, allowNull: false, defaultValue: '' },
        password: {
            type: Datatype.STRING,
            allowNull: false
        },
        password_input: {
            type: Datatype.VIRTUAL,
            set: function(val) {
                this.setDataValue('password_input', val); // Remember to set the data value, otherwise it won't be validated
                this.setDataValue('password', this.salt + val);
            },
            validate: {
                isLongEnough: function(val) {
                    if (val.length < 7) {
                        throw new Error("Please choose a longer password");
                    }
                }
            }
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