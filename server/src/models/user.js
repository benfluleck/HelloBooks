import bcrypt from 'bcrypt';
import toTitleCase from 'to-title-case';

export default(sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
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
        msg: 'Username already in database'
      },
      allowNull: false,

      validate: {
        notEmpty: {
          args: true,
          msg: 'Usernames can not be empty'
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

    passwordConfirmation: {
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
        msg: 'This email is already in use'
      },
      trim: true,
      validate: {
        isEmail: {
          arg: true,
          msg: 'This email must be a valid email address'
        }
      }
    },
    userLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true
    },
    borrowCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    googleId: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        if (user.password === user.passwordConfirmation) {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        } else {
          throw new Error('Passwords do not match');
        }
      },
    }
  });
  User.associate = (models) => {
    User.belongsToMany(models.Books, {
      as: 'userbooks',
      through: models.UserBooks,
      foreignKey: 'id'
    });
    User.hasMany(models.Notifications, {
      foreignKey: 'id',
      as: 'Notifications',
    });
    User.belongsTo(models.Userlevel, {
      as: 'level',
      foreignKey: 'userLevel',
    });
  };

  User.generateHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

  return User;
};
