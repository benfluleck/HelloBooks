
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

require('dotenv').config();

chai.use(chaiHttp);

const usrToken = () => new Promise((resolve) => {
  let userToken = '';
  let adminToken = '';
  chai
    .request(app)
    .post('/api/v1/auth/users/signin')
    .send({
      username: 'testuser',
      password: 'testuser',
    })
    .end((err, res) => {
      userToken = res.body.token;
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .send({
          username: 'bennyogidan',
          password: process.env.ADMIN_PASSWORD,
        })
        .end((err, res) => {
          adminToken = res.body.token;
          resolve({
            userToken,
            adminToken
          });
        });
    });
});

export default usrToken;
