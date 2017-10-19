const faker = require('faker');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Books', [
      {
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        category: 'Fiction',
        quantity: 20,
        description: faker.lorem.paragraphs(),
        ISBN: 1222222222,
        bookimage: 'Test Image',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        category: 'Horror',
        quantity: 25,
        description: faker.lorem.paragraphs(),
        ISBN: 1222221212,
        bookimage: 'Test Image',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: faker.company.catchPhrase(),
        author: faker.name.firstName(),
        category: 'Drama',
        quantity: 20,
        description: faker.lorem.paragraphs(),
        ISBN: 1222343432,
        bookimage: 'Test Image',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete('Books', [{
      username: 'aimee'
    }])
};
