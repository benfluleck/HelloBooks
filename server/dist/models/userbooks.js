'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uniqueRandom = require('unique-random');

var _uniqueRandom2 = _interopRequireDefault(_uniqueRandom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomId = (0, _uniqueRandom2.default)(1000000, 100000000);

exports.default = function (sequelize, DataTypes) {
  var UserBooks = sequelize.define('UserBooks', {
    bookid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_return_date: {
      type: DataTypes.DATE,
      //set to false on launch
      allowNull: true
    },
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: function defaultValue() {
        return randomId();
      }
    },
    return_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {},
    hooks: {
      beforeCreate: function beforeCreate(UserBooks) {
        if (UserBooks.return_date < Date.now()) {

          throw new Error('Date is less than current date');
        }
      }
    }

  });
  UserBooks.associate = function (models) {
    UserBooks.belongsTo(models.Books, {
      foreignKey: 'id',
      as: 'book',
      onDelete: 'CASCADE'
    });
    UserBooks.belongsTo(models.User, {
      foreignKey: 'id',
      onDelete: 'CASCADE'
    });
  };

  return UserBooks;
};