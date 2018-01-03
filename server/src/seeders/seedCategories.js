module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Categories', [
      {
        categoryName: 'Fiction',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Drama',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Horror',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Thriller',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Action',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Science',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        categoryName: 'Comedy',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),

  down: queryInterface =>
    queryInterface.bulkDelete('Categories', [{
      categoryName: 'Fiction'
    }, {
      categoryName: 'Action',
    }, {
      categoryName: 'Biography',
    },

    {
      categoryName: 'Drama',
    }
    ])
};
