'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        underscore: true
    });
    User.associate = (models) => {
        User.hasMany(models.Books, {
            // associations can be defined here
            foreignKey: 'id',



        });

    };
    return User;
};