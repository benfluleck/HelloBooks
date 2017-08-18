'use strict';
var toTitleCase = require('to-title-case');
var sentenceCase = require('sentence-case');


module.exports = {
 up: function(queryInterface, Sequelize) {
  return queryInterface.createTable('Books', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
   },
   title: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    unique: 'compositeIndex',
    validate: {
     is: {
      arg: /\w+/g,
      msg: 'Must be only letters',
     },
     len: {
      args: [2, 30],
      msg: 'Book Title must be at least 2 chars and less than 50 chars'
     }
    },
    set(val) {
     this.setDataValue('title', toTitleCase(val));
    }
   },
   author: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    unique: 'compositeIndex',
    validate: {
     is: {
      arg: /\w+/g,
      msg: 'Must be only letters',
     },
     len: {
      args: [2, 30],
      msg: `Author's name must be at least 2 chars and less than 50 chars`
     }
    },
    set(val) {
     if (val !== undefined) {
      this.setDataValue('author', toTitleCase(val));
     }
    }
   },
   category: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    validate: {
     is: {
      arg: /\w+/g,
      msg: 'Must be only letters',
     },
     len: {
      args: [2, 30],
      msg: 'Category name must be at least 2 chars and less than 30 chars'
     }
    },
    set(val) {
     if (val !== undefined) {
      this.setDataValue('category', toTitleCase(val));
     }
    }
   },
   description: {
    type: Sequelize.TEXT,
    allowNull: true,
    trim: true,
    set(val) {
     if (val !== undefined) {
      this.setDataValue('description', sentenceCase(val));
     }
    }
   },
   quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
     isNumeric: {
      msg: 'Only numbers allowed'
     }
    },
   },
   status: {
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
  return queryInterface.dropTable('Books');
 }
};