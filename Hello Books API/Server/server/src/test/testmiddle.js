import chai from 'chai';
import db from '../../app/models';
//import helper from '../helper/test.helper';

const expect = chai.expect;


describe('User ', () => {
 it('should not create a user when password character is not up to 8',
  (done) => {
   User.create(helper.invalidPasswordUser)
    .then({
     firstname: faker.name.firstName(),
     lastname: faker.name.lastName(),
     username: 'Benny',
     password: '',
     password_confirmation: '',
     email: 'benny@ogidan.com'
    })
    .catch((error) => {
     expect(error.errors[0].message)
      .to.equal('Minimum of 8s characters is required');
     expect(error.errors[0].type).to.equal('Validation error');
     expect(error.errors[0].path).to.equal('validatePassword');
     done();
    });
  });
});