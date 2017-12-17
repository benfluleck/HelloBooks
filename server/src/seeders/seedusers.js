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
        userImage: 'http://res.cloudinary.com/digpnxufx/image/upload/v1510582526/boy_avatar_s1rb9m.svg'
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
        userImage: 'http://res.cloudinary.com/digpnxufx/image/upload/v1510582526/boy_avatar_s1rb9m.svg'
      }
    ]),
  down: queryInterface =>
    queryInterface.bulkDelete('User', [{
    }])
};

