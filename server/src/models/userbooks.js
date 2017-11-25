export default(sequelize, DataTypes) => {
  const UserBooks = sequelize.define('UserBooks', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userReturnDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    returnStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    classMethods: {},
    hooks: {
      beforeCreate: (UserBooks) => {
        if (UserBooks.returndate < Date.now()) {
          throw new Error('Date is less than current date');
        }
      }
    }

  });
  UserBooks.associate = (models) => {
    UserBooks.belongsTo(models.Books, {
      foreignKey: 'bookId',
      as: 'book',
      onDelete: 'CASCADE'
    });
    UserBooks.belongsTo(models.User, {
      foreignKey: 'userId',
      as:'user',
      onDelete: 'CASCADE'
    });
  };

  return UserBooks;
};
