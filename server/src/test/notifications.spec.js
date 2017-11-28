import chai from 'chai';
import chaiHttp from 'chai-http';


import app from '../app';


const expect = chai.expect;

chai.use(chaiHttp);


let adminToken = '';

describe('User', () => {
  it('should return 200 when an admin user login is successful', (done) => {
    chai.request(app).post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'bennyogidan',
        password: 'bennyogidan',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        adminToken = res.body.token;
        done();
      });
  });
});
describe('Notifications', () => {
  it('should return 200 when admin displays notification', (done) => {
    chai.request(app).get('/api/v1/admin/notifications').set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        done();
      });
  });
});
