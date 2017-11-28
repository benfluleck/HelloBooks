export default (sequelize, DataTypes) => {
  const Notifications = sequelize.define('Notifications', {
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    action: DataTypes.STRING
  });

  Notifications.associate = (models) => {
    Notifications.belongsTo(models.Books, {
      as: 'book',
      foreignKey: 'bookId',
    });
    Notifications.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Notifications;
};
