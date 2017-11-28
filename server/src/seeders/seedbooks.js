const faker = require('faker');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Books', [
      {
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        categoryId: '3',
        quantity: '20',
        description: faker.lorem.paragraphs(),
        ISBN: 1222222222,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Benny goes to school',
        author: 'Andela Human',
        categoryId: '1',
        quantity: '25',
        description: faker.lorem.paragraphs(),
        ISBN: 1222221212,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        categoryId: '1',
        quantity: '20',
        description: faker.lorem.paragraphs(),
        ISBN: 1222343432,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        categoryId: 2,
        quantity: 20,
        description: faker.lorem.paragraphs(),
        ISBN: 1222343432,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete('Books', [{
    }])
};
