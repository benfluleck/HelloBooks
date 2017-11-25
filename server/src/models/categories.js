'use strict';
export default(sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Please enter a category name'
      }
    }
  }, { paranoid: true });

  // defines associations for category
  Categories.associate = (models) => {
    Categories.hasMany(models.Books, {
      foreignKey: 'categoryId',
      as: 'books'
    });
  };
  return Categories;
};
