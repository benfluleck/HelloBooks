'use strict';
module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Books', {
        book_title: {
            types: DataTypes.STRING,
            allowNull: false,
        },
        books_author: {
            types: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            types: DataTypes.STRING,
            allowNull: false,
        },
        on_loan: {
            types: DataTypes.BOOLEAN,
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
        underscored: true
    });
    return Books;
};