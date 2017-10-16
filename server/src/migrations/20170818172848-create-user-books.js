'use strict';
import Sequilize from 'sequelize';

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
    type: Sequelize.INTEGER,
    allowNull: false,

   },
   userid: {
    type: Sequelize.INTEGER,
    allowNull: false,

   },
   returndate: {
    type: Sequelize.DATE,
    allowNull: false,
   },
   userReturndate: {
    type: Sequelize.DATE,
    allowNull: true,
   },
   returnstatus: {
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
