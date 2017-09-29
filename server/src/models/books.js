import toTitleCase from 'to-title-case';
import sentenceCase from 'sentence-case';
import uniqueRandom from 'unique-random';

export default (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {


    title: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      unique: 'compositeIndex',
      validate: {
        len: {
          args: [2, 30],
          msg: 'Book Title must be at least 2 chars and less than 50 chars'
        }
      },
      set(val) {
        this.setDataValue('title', toTitleCase(val));
      }
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
        },
        len: {
          args: [2, 30],
          msg: "Author's name must be at least 2 chars and less than 50 chars"
        }
      },
      set(val) {
        if (val !== undefined) {
          this.setDataValue('author', toTitleCase(val));
        }
      }
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
          args: [2, 30],
          msg: 'Category name must be at least 2 chars and less than 30 chars'
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

    book_image: {
      type: DataTypes.STRING,
      //  allowNull: true,
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
