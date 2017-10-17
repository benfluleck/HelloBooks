import toTitleCase from 'to-title-case';
import sentenceCase from 'sentence-case';
import uniqueRandom from 'unique-random';
import dotenv from 'dotenv';


dotenv.config();
const randomId = uniqueRandom(process.env.ISBNRANDOM_MIN_ID, process.env.ISBNRANDOM_MAX_ID);

export default (sequelize, DataTypes) => {
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
      validate: {
        is: {
          arg: /\w+/g,
          msg: 'Must be only letters',
        }
      },
      set(val) {
        if (val !== undefined) {
          this.setDataValue('author', toTitleCase(val));
        }
      }
    },
    ISBN: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => randomId()
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        is: {
          arg: /\w+/g,
          msg: 'Must be only letters',
        },
        len: {
          args: [5, 20],
          msg: 'Category name must be at least 5 chars and less than 20 characters'
        }
      },
      set(val) {
        if (val !== undefined) {
          this.setDataValue('category', toTitleCase(val));
        }
      }


    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      trim: true,
      set(val) {
        if (val !== undefined) {
          this.setDataValue('description', sentenceCase(val));
        }
      }


    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isNumeric: {
          msg: 'Only numbers allowed'
        }
      },

    },

    bookimage: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
  });
  Books.associate = (models) => {
    Books.belongsToMany(models.User, {
      as: 'userbooks',
      through: models.UserBooks,
      foreignKey: 'bookid'
    });
  };

  return Books;
};
