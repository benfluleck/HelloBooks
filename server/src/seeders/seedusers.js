import faker from 'faker';


const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('User', [
      {
        username: 'testuser',
        password: bcrypt.hashSync('testuser', bcrypt.genSaltSync(10)),
        email: 'sample@email.com',
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'bennyogidan',
        password: bcrypt.hashSync('bennyogidan', bcrypt.genSaltSync(10)),
        email: 'benfluleck@gmail.com',
        firstname: 'Administrator',
        isAdmin: true,
        lastname: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete('User', [{
    }])
};

