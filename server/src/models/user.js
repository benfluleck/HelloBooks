import bcrypt from 'bcrypt-nodejs';
import toTitleCase from 'to-title-case';
import Sequelize from 'sequelize';

export default(sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: {
          args: [
            2, 30
          ],
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
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        // is: {  arg: /\w+/g,  msg: 'Lastname can only consit of letters', },
        len: {
          args: [
            2, 30
          ],
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
      type: DataTypes.STRING,
      trim: true,
      unique: {
        args: true,
        msg: "Username already in database"
      },
      allowNull: false,

      validate: {
        notEmpty: {
          args: true,
          msg: 'Usernames can not be empty'
        },
        isAlphanumeric: {
          args: true,
          msg: 'No Alphanumeric characters please'
        },
        len: {
          args: [
            4, 30
          ],
          msg: 'Username must be at least 2 chars and less than 30 chars'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        len: {
          arg: [
            5, 16
          ],
          msg: 'Length between 5 and 16 please'
        },
        notEmpty: {
          args: true,
          msg: 'Password can not be empty'
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
      unique: {
        args: true,
        msg: "Email already in database"
      },
      trim: true,
      validate: {
        isEmail: {
          arg: true,
          msg: 'Must be an Email address'
        },
        len: {
          args: [
            5, 45
          ],
          msg: 'Firstname must be at least 2 chars and less than 30 chars'
        }
      }
    },
    user_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    user_image: {
      type: DataTypes.STRING,
      allowNull: true
    },

    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    hooks: {

      beforeCreate: (user) => {
        if (user.password === user.password_confirmation) {
          user.password = User.generateHash(user.password);
        } else {
          throw new Error('Passwords do not the match');
        }

      },

      beforeUpdate: (user) => {
        if (user._changed.password) {
          this.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
        }
      }
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Books, {
      as: 'userbooks',
      through: models.UserBooks,
      foreignKey: 'userid'
    });
  };

  User.generateHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

  return User;
};
