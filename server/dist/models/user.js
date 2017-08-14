'use strict';

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _toTitleCase = require('to-title-case');

var _toTitleCase2 = _interopRequireDefault(_toTitleCase);

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
          arg: /^[A-Za-z]+$/i,
          msg: 'Firstname can only consit of letters'
        }
      },
      set: function set(val) {
        this.setDataValue('firstname', (0, _toTitleCase2.default)(val));
      }
    },

    lastname: {
      type: DataTypes.STRING,
      required: true,
      trim: true,
      validate: {
        is: {
          arg: /^[A-Za-z]+$/i,
          msg: 'Lastname can only consit of letters'
        }
      },
      set: function set(val) {
        this.setDataValue('lastname', (0, _toTitleCase2.default)(val));
      }
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      trim: true,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Usernames can not be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'Only Alpha numeric for usernames please'
        }
      },
      unique: {
        args: true,
        msg: 'Username already exist in database'
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
        notEmpty: {
          args: true,
          msg: 'Password confirmation can not be empty'
        }
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
        msg: 'Email already exist'
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
          throw new Error('Passwords do not the match');
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
  };

  return User;
};