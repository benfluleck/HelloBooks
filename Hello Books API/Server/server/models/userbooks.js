'use strict';
module.exports = (sequelize, DataTypes) => {
    let UserBooks = sequelize.define('UserBooks', {
        userid: DataTypes.INTEGER,
        bookid: DataTypes.INTEGER,
        return_date: DataTypes.DATE,
        return_status: DataTypes.BOOLEAN
    }, {
        classMethods: {

            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return UserBooks;
};