'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserBooks = sequelize.define('UserBooks', {
    userid: DataTypes.INTEGER,
    bookid: DataTypes.INTEGER,
    return_date: DataTypes.DATE,
    return_status: DataTypes.BOOLEAN
  }, {
    classMethods: {}
  });
  return UserBooks;
};