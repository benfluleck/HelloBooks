
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Userlevel', [
      {
        levelName: 'Bronze',
        level: 1,
        maxBooks: 4,
        maxDays: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        levelName: 'Silver',
        level: 2,
        maxDays: 5,
        maxBooks: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        levelName: 'Gold',
        level: 3,
        maxDays: 10,
        maxBooks: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        levelName: 'Platinium',
        level: 4,
        maxBooks: 50,
        maxDays: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),

  down: queryInterface =>
    queryInterface.bulkDelete('Userlevel', [{
      levelName: 'Bronze'
    }, {
      levelName: 'Silver'
    }, {
      levelName: 'Gold'
    },
    {
      levelName: 'Platinumi'
    }
    ])
};
