import toTitleCase from 'to-title-case';
import uniqueRandom from 'unique-random';

const randomId = uniqueRandom(1000000, 1000000);

module.exports = (sequelize, DataTypes) => {
 const Books = sequelize.define('Books', {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  title: {
   type: DataTypes.STRING,
   allowNull: false,
   required: true,
   trim: true,
   validate: {
    is: {
     arg: ['^[a-z]+$', 'i'],
     msg: 'Must be only letters',
    }
   },
   set(val) {
    this.setDataValue('title', toTitleCase(val));
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
     msg: 'Must be only letters',
    }
   },
   set(val) {
    this.setDataValue('author', toTitleCase(val));
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
     msg: 'Must be only letters',
    }
   },
   set(val) {
    this.setDataValue('category', toTitleCase(val));
   }


  },
  Isbn: {
   type: DataTypes.INTEGER,
   allowNull: false,
   defaultValue: () => randomId()
  },
  status: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false,
  },
 }, {
  underscore: true,
 });
 Books.associate = (models) => {
  Books.belongsToMany(models.User, { as: 'userbooks', through: models.UserBooks, foreignKey: 'bookid' });
 };

 return Books;
};