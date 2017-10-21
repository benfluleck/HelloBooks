import faker from 'faker';


const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('User', [
      {
        username: faker.internet.userName(),
        password: bcrypt.hashSync('bookiiii', 10),
        email: faker.internet.email(),
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: faker.internet.userName(),
        password: bcrypt.hashSync('bookiiii', 10),
        email: 'sample@email.com',
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete('User', [{
      
    }])
};

