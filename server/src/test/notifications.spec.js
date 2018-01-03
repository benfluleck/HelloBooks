import chai from 'chai';
import chaiHttp from 'chai-http';

import usrToken from './helpers/testHooks';
import app from '../app';

const expect = chai.expect;

chai.use(chaiHttp);

let adminToken = '';

describe('<Notifications', () => {
  before((done) => {
    usrToken().then((response) => {
      adminToken = response.adminToken;
      done();
    });
  });

  it('should return 200 when admin displays notification', (done) => {
    chai
      .request(app)
      .get('/api/v1/admin/notifications')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        done();
      });
  });
});
