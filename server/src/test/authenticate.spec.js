import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

let token = '';
const errorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

describe('Authentication', () => {
  it('should return 401 if token is not a token', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/changepassword')
      .set('x-access-token', '')
      .send({ newPassword: 'bennyogidan23' })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(401);
        done();
      });
  });
  it('should return 201 when a regular user is created', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'benogidan',
        password: 'boooboo',
        passwordConfirmation: 'boooboo',
        firstname: 'Benny',
        email: faker
          .internet
          .email(),
        lastname: faker
          .name
          .lastName()
      })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(201);
        done();
      });
  });
  it('should return 200 when a regular user signs in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ username: 'benogidan', password: 'boooboo' })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        token = res.body.token;
        done();
      });
  });
  it('should return 403 if token is not an admin token', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('x-access-token', token)
      .send({ categoryName: 'EDUCATIONAL' })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(403);
        done();
      });
  });
  it('should return 401 if error with token', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('x-access-token', errorToken)
      .send({ categoryName: 'EDUCATIONAL' })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(401);
        done();
      });
  });
});
