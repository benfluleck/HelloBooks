import toTitleCase from 'to-title-case';
import sentenceCase from 'sentence-case';
import uniqueRandom from 'unique-random';
import dotenv from 'dotenv';

dotenv.config();
const randomId = uniqueRandom(process.env.ISBNRANDOM_MIN_ID, process.env.ISBNRANDOM_MAX_ID);

export default(sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      unique: 'compositeIndex'
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      unique: 'compositeIndex',
    },
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => randomId()
    },

    description: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
      set(val) {
        if (val !== undefined) {
          this.setDataValue('description', sentenceCase(val));
        }
      },
    },
    categoryId: {
      allownull: false,
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isNumeric: {
          msg: 'Only numbers allowed'
        }
      }
    },
    bookImage: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    paranoid: true
  });
  Books.associate = (models) => {
    Books.belongsToMany(models.User, {
      as: 'userbooks',
      through: models.UserBooks,
      foreignKey: 'bookId'
    });
    Books.belongsTo(models.Categories, {
      as: 'category',
      foreignKey: 'categoryId'
    });
    Books.hasMany(models.Notifications, {
      foreignKey: 'id'
    });
  };

  return Books;
};
