'use strict';
var uniqueRandom = require('unique-random');
var randomId = uniqueRandom(1000000, 100000000);

module.exports = {
 up: function(queryInterface, Sequelize) {
  return queryInterface.createTable('UserBooks', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   bookid: {
    type: DataTypes.INTEGER,
    allowNull: false,

   },
   userid: {
    type: DataTypes.INTEGER,
    allowNull: false,

   },
   return_date: {
    type: Sequelize.DATE,
    allowNull: false,
   },
   user_return_date: {
    type: Sequelize.DATE,
    allowNull: true,
   },
   ISBN: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: () => randomId()
   },
   return_status: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
   },
   createdAt: {
    allowNull: false,
    type: Sequelize.DATE
   },
   updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
   }
  });
 },
 down: function(queryInterface, Sequelize) {
  return queryInterface.dropTable('UserBooks');
 }
};