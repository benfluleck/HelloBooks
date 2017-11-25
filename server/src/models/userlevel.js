'use strict';
export default(sequelize, DataTypes) => {
 const Userlevel = sequelize.define('Userlevel', {
    maxBooks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    maxDays: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    levelName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {freezeTableName: true});
  Userlevel.associate = (models) => {
    Userlevel.hasMany(models.User, {
      foreignKey: 'id',
      as: 'userLevel'
    });
  };
  return Userlevel;
};
