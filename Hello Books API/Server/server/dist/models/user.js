'use strict';

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true

    },
    firstname: {
      type: String,
      required: true,
      trim: true,
      validate: {
        isName: ['^[a-z]+$', 'i'],
        msg: 'Must be only letters'
      }
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      validate: {
        isName: ['^[a-z]+$', 'i'],
        msg: 'Must be only letters'
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        isEmail: true,
        msg: 'Must be an Email address'
      }
    },
    level: {
      type: DataTypes.STRING,
      allowNull: false,
      default: 'Bronze'
    },
    isAdmin: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    underscore: true
  });
  User.associate = function (models) {
    User.belongsToMany(models.Books, { as: 'userbooks', through: models.UserBooks, foreignKey: 'userid' });
  };
  return User;
};