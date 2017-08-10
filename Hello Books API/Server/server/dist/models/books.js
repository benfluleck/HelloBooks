'use strict';

module.exports = function (sequelize, DataTypes) {
  var Books = sequelize.define('Books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        isName: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        isName: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        isName: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      }

    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    underscore: true
  });
  Books.associate = function (models) {
    Books.belongsToMany(models.User, { as: 'userbooks', through: models.UserBooks, foreignKey: 'bookid' });
  };

  return Books;
};