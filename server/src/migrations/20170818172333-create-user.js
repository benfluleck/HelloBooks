

import Sequelize from 'sequelize';


module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('User', {
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
    userLevel: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    borrowCount: {
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    googleId: {
      type: Sequelize.STRING,
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('User')
};
