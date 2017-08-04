'use strict';
module.exports = (sequelize, DataTypes) => {
    let Books = sequelize.define('Books', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        books_author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        underscore: true,
    });
    Books.associate = (models) => {
        Books.hasMany(models.User, {
            foreignKey: 'id',
            as: 'userid'


        });


    };
    return Books;
};