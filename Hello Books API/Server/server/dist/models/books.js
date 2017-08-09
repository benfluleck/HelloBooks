'use strict';

module.exports = function (sequelize, DataTypes) {
    var Books = sequelize.define('Books', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        books_author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        underscore: true
    });
    Books.associate = function (models) {
        Books.belongsToMany(models.User, { as: 'userbooks', through: models.UserBooks, foreignKey: 'bookid' });
    };

    return Books;
};