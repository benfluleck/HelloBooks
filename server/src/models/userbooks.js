import uniqueRandom from 'unique-random';
const randomId = uniqueRandom(1000000, 100000000);

export default (sequelize, DataTypes) => {
 const UserBooks = sequelize.define('UserBooks', {
  bookid: {
   type: DataTypes.INTEGER,
   allowNull: false,

  },
  userid: {
   type: DataTypes.INTEGER,
   allowNull: false,

  },
  return_date: {
   type: DataTypes.DATE,
   allowNull: false,
  },
  user_return_date: {
   type: DataTypes.DATE,
   //set to false on launch
   allowNull: true,
  },
  ISBN: {
   type: DataTypes.INTEGER,
   allowNull: false,
   defaultValue: () => randomId()
  },
  return_status: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false,
  },
 }, {
  classMethods: {

  },
  hooks: {
   beforeCreate: (UserBooks) => {
    if (UserBooks.return_date < Date.now()) {

     throw new Error('Date is less than current date');
    }

   },

  }

 });
 UserBooks.associate = (models) => {
  UserBooks.belongsTo(models.Books, {
   foreignKey: 'id',
   as: 'book',
   onDelete: 'CASCADE',
  });
  UserBooks.belongsTo(models.User, {
   foreignKey: 'userid',
   onDelete: 'CASCADE',
  });
 };

 return UserBooks;
};