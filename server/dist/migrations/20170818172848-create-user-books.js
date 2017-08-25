'use strict';

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.createTable('UserBooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookid: {
        type: Sequelize.INTEGER,
        allowNull: false

      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false

      },
      return_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      user_return_date: {
        type: Sequelize.DATE,
        allowNull: true
      },
      ISBN: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: function defaultValue() {
          return randomId();
        }
      },
      return_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
  down: function down(queryInterface, Sequelize) {
    return queryInterface.dropTable('UserBooks');
  }
};