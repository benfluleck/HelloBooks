'use strict';
var bcrypt = require('bcrypt-nodejs');
var toTitleCase = require('to-title-case');
var Sequelize = require('sequelize');

module.exports = {
 up: function(queryInterface, Sequelize) {
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
    trim: true,
    validate: {
     // is: {
     //  arg: /\w+/g,
     //  msg: 'Firstname can only consit of letters'
     // },
     len: {
      args: [2, 30],
      msg: 'Firstname must be at least 2 chars and less than 30 chars'
     }
    },
    set(val) {
     if (val !== undefined) {
      this.setDataValue('firstname', toTitleCase(val));
     }
    }
   },
   lastname: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    validate: {
     // is: {
     //  arg: /\w+/g,
     //  msg: 'Lastname can only consit of letters',
     // },
     len: {
      args: [2, 30],
      msg: 'Lastname must be at least 2 chars and less than 30 chars'
     }
    },
    set(val) {
     if (val !== undefined) {
      this.setDataValue('lastname', toTitleCase(val));
     }
    }
   },
   username: {
    type: Sequelize.STRING,
    trim: true,
    allowNull: false,
    validate: {
     notEmpty: {
      args: true,
      msg: 'Usernames can not be empty'
     },
     isAlphanumeric: {
      args: true,
      msg: 'Only Alpha numeric for usernames please',
     },
     len: {
      args: [4, 30],
      msg: 'Username must be at least 2 chars and less than 30 chars'
     }
    },
    unique: {
     args: true,
     msg: 'Username already exist in database'
    }
   },
   password: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    validate: {
     len: {
      arg: [5, 16],
      msg: 'Length between 5 and 16 please',
     },
     notEmpty: {
      args: true,
      msg: 'Password can not be empty'
     }
    }
   },
   email: {
    type: Sequelize.STRING,
    allowNull: false,
    trim: true,
    validate: {
     isEmail: {
      arg: true,
      msg: 'Must be an Email address'
     },
     len: {
      args: [5, 45],
      msg: 'Firstname must be at least 2 chars and less than 30 chars'
     }
    },
    unique: {
     args: true,
     msg: 'Email already exist'
    }
   },
   user_level: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1,

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
 down: function(queryInterface, Sequelize) {
  return queryInterface.dropTable('Users');
 }
};