'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    firstname: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
      validate: {
        is: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      }
    },

    lastname: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
      validate: {
        is: {
          arg: ['^[a-z]+$', 'i'],
          msg: 'Must be only letters'
        }
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: 'Only Alpha numeric characters please'
        }
      },
      unique: {
        args: true,
        msg: 'Username already exist'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        len: {
          arg: [5, 16],
          msg: 'Length between 5 and 16 please'
        }

      }
    },
    password_confirmation: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        isEmail: {
          arg: true,
          msg: 'Must be an Email address'
        }
      },
      unique: {
        args: true,
        msg: 'email already exist'
      }
    },
    user_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1

    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {

    hooks: {

      beforeCreate: function beforeCreate(user) {
        // user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        // user.password_confirmation
        if (user.password === user.password_confirmation) {
          user.password = User.generateHash(user.password);
        } else {
          return "Passwords do not the match";
        }
      },

      beforeUpdate: function beforeUpdate(user) {
        if (user._changed.password) {

          undefined.password = _bcryptNodejs2.default.hashSync(user.password, _bcryptNodejs2.default.genSaltSync(10), null);
        }
      }
    }
  });
  User.associate = function (models) {
    User.belongsToMany(models.Books, {
      as: 'userbooks',
      through: models.UserBooks,
      foreignKey: 'userid'
    });
  };

  User.generateHash = function (password) {
    return _bcryptNodejs2.default.hashSync(password, _bcryptNodejs2.default.genSaltSync(10), null);
  }, User.validatepassword = function (password, password2) {
    console.log(_typeof(undefined.password));
    return _bcryptNodejs2.default.compareSync(password, password2);
  };

  return User;
};