'use strict';
module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Books', {
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
        on_loan: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        }
    });
    Books.associate = (models) => {
        Books.belongsTo(models.User, {
            foreignKey: 'userId',
            onDelete: 'CASCADE',
        });


    };
    return Books;
};