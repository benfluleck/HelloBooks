'use strict';
import Sequilize from 'sequelize';


module.exports = {
 up: (queryInterface, Sequelize) => {
  return queryInterface.createTable('User', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   firstname: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   lastname: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
   },
   email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    isEmail: true,
   },
   password: {
    type: Sequelize.STRING,
    allowNull: false,
   },
   user_level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
   },
   user_image: {
    type: Sequelize.STRING,
    allowNull: true,
   },
   isAdmin: {
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
 down: (queryInterface, Sequelize) => {
  return queryInterface.dropTable('User');
 }
};