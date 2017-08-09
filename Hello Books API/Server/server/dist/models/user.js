'use strict';

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        underscore: true
    });
    User.associate = function (models) {

        User.belongsToMany(models.Books, { as: 'userbooks', through: models.UserBooks, foreignKey: 'userid' });
    };
    return User;
};