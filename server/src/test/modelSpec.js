import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';


import db from '../models';

const User = db.User;
const expect = chai.expect;

chai.use(chaiHttp);


describe('<Unit Test>', () => {
  describe('Model User:', () => {
    before((done) => {
      User.build({
        firstname: faker
          .name
          .firstName(),
        lastname: faker
          .name
          .lastName(),
        username: 'Enodi',
        password: 'bennyogidan',
        passwordConfirmation: 'bennyogidan',
        email: faker
          .internet
          .email()
      });

      done();
    });

    describe('Method Save', () => {
      it(
        'should inform the user that the passwords do not match',
        (done) => {
          User.create({
            firstname: faker
              .name
              .firstName(),
            lastname: faker
              .name
              .lastName(),
            username: 'Amaka',
            password: 'bennyogidan',
            passwordConfirmation: 'bennyogisfdsdan',
            email: faker
              .internet
              .email()
          })
            .then(() => {
            })
            .catch((error) => { expect(error.message).to.equal('Passwords do not match'); });
          done();
        }
      );
    });
  });
});
