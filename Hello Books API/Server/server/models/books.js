'use strict';
module.exports = (sequelize, DataTypes) => {
    const Books = sequelize.define('Books', {
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
    });
    Books.associate = (models) => {
        Books.belongsTo(models.User, {
            // associations can be defined here
            foreignKey: 'UserId',
            onDelete: 'CASCADE',

        });

    }, {
        underscored: true
    });
return Books;
};