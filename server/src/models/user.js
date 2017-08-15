import bcrypt from 'bcrypt-nodejs';
import toTitleCase from 'to-title-case';

export default (sequelize, DataTypes) => {
 const User = sequelize.define('User', {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   allowNull: false,
   autoIncrement: true,
  },

  firstname: {
   type: DataTypes.STRING,
   required: true,
   allowNull: false,
   trim: true,
   validate: {
    is: {
     arg: /^[A-Za-z]+$/i,
     msg: 'Firstname can only consit of letters'
    },
   },
   set(val) {
    if (val !== undefined) {
     this.setDataValue('firstname', toTitleCase(val));
    }
   }
  },


  lastname: {
   type: DataTypes.STRING,
   required: true,
   allowNull: false,
   trim: true,
   validate: {
    is: {
     arg: /^[A-Za-z]+$/i,
     msg: 'Lastname can only consit of letters',
    },
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
   allowNull: false,
   validate: {
    notEmpty: {
     args: true,
     msg: 'Usernames can not be empty'
    },
    isAlphanumeric: {
     args: true,
     msg: 'Only Alpha numeric for usernames please',
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
   defaultValue: 1,

  },

  isAdmin: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false,
  }
 }, {

  hooks: {

   beforeCreate: (user) => {
    // user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // user.password_confirmation
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
  },
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