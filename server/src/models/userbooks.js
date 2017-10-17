

export default(sequelize, DataTypes) => {
  const UserBooks = sequelize.define('UserBooks', {
    bookid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    returndate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userReturndate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    returnstatus: {
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
      foreignKey: 'bookid',
      as: 'book',
      onDelete: 'CASCADE'
    });
    UserBooks.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'CASCADE'
    });
  };

  return UserBooks;
};
