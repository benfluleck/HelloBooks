'use strict';

var _toTitleCase = require('to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

var _uniqueRandom = require('unique-random');

var _uniqueRandom2 = _interopRequireDefault(_uniqueRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomId = (0, _uniqueRandom2.default)(1000000, 1000000);

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
        is: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      },
      set: function set(val) {
        this.setDataValue('title', (0, _toTitleCase2.default)(val));
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        is: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      },
      set: function set(val) {
        this.setDataValue('author', (0, _toTitleCase2.default)(val));
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        is: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      },
      set: function set(val) {
        this.setDataValue('category', (0, _toTitleCase2.default)(val));
      }
    },
    Isbn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: function defaultValue() {
        return randomId();
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