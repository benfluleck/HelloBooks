'use strict';
module.exports = (sequelize, DataTypes) => {
    const User_Books = sequelize.define('User_Books', {
        returned: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }


    }, {
        underscored: true;
    });
    return User_Books;
};