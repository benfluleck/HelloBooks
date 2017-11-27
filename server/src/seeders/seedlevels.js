
module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Userlevel', [
      {
        levelName: 'Bronze',
        level:1,
        maxBooks: 2,
        maxDays: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        levelName: 'Silver',
        level:2,
        maxDays: 5,
        maxBooks: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        levelName: 'Gold',
        level:3,
        maxBooks: 10,
        maxDays: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      }]),

  down: queryInterface =>
    queryInterface.bulkDelete('Userlevel', [{
      levelName: 'Bronze'
    }, {
      levelName: 'Silver'
    }, {
      levelName: 'Gold'
    }])
};
