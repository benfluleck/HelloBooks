import chai from 'chai';
import chaiHttp from 'chai-http';
import usrToken from './helpers/testHooks';

import app from '../app';
import db from '../models';

const { Books } = db;
const { expect } = chai;

chai.use(chaiHttp);

let bookId;
const userId = '1';
let userToken = '';
let adminToken = '';

describe('Users', () => {
  before((done) => {
    usrToken().then((response) => {
      userToken = response.userToken;
      adminToken = response.adminToken;
      done();
    });
    Books
      .create({
        title: 'Shola comes home',
        author: 'Benny',
        categoryId: '3',
        quantity: '20',
        description: 'Testewfewwww',
        bookimage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
      });
  });
  it('should allow only authenticated users to view books', (done) => {
    chai
      .request(app)
      .get('/api/v1/books/')
      .set('Accept', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(401);
        expect(res.body.token)
          .to.equal(null);
        expect(res.body.message)
          .to.equal("Unauthorised access");
        done();
      });
  });
  it('should allow only authenticated users see the book list', (done) => {
    chai
      .request(app)
      .get('/api/v1/users/1/books')
      .set('Accept', 'application/x-www-form-urlencoded')
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(401);
        expect(res.body.token)
          .to.equal(null);
        expect(res.body.message)
          .to.equal("Unauthorised access");
        done();
      });
  });
  describe('<Change User level Route', () => {
    it('should return 409 when the level is ' +
    'changed to the existing level', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/changeuserlevel')
        .set('x-access-token', adminToken)
        .send({ newLevelId: '1', userId: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(409);
          expect(res.body.message)
            .to
            .equal('This user is already on this level');
          done();
        });
    });
    it('should return 400 when the new level is not a number ', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/changeuserlevel')
        .set('x-access-token', adminToken)
        .send({ newLevelId: 'aas', userId: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          expect(res.body.message)
            .to
            .equal('Please select a valid level');
          done();
        });
    });
    it('should return 200 when level change is successful', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/changeuserlevel')
        .set('x-access-token', adminToken)
        .send({ newLevelId: '2', userId: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body).to.be.a('object');
          expect(res.body.message)
            .to
            .equal('Level changed Successfully,New Level "Silver"');
          done();
        });
    });
    it('should return 400 when newLevelId is null', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/changeuserlevel')
        .set('x-access-token', adminToken)
        .send({ userId: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          expect(res.body.message)
            .to
            .equal('Please select a valid level');
          done();
        });
    });
    it('should return 404 when new level does not exist', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/changeuserlevel')
        .set('x-access-token', adminToken)
        .send({ newLevelId: '20', userId: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          expect(res.body.message)
            .to
            .equal('Level does not exist');

          done();
        });
    });
    it('should return 404 when the user is not found ', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/changeuserlevel')
        .set('x-access-token', adminToken)
        .send({ newLevelId: '2', userId: 445454 })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          expect(res.body.message)
            .to
            .equal('User not found');

          done();
        });
    });
  });
  describe('<Loan Books', () => {
    it('should not allow only unauthenticated users to loan books', (done) => {
      chai
        .request(app)
        .post(`/api/v1/users/loanbook`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          expect(res.body.token)
            .to.equal(null);
          expect(res.body.message)
            .to.equal("Unauthorised access");
          done();
        });
    });
  });
  describe('<Edit Books', () => {
    it('should not allow unauthenticated users to edit books', (done) => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          expect(res.body.token)
            .to.equal(null);
          expect(res.body.message)
            .to.equal("Unauthorised access");
          done();
        });
    });
    it('should not allow only authenticated users to return books', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/returnbook`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          expect(res.body.token)
            .to.equal(null);
          expect(res.body.message)
            .to.equal("Unauthorised access");

          done();
        });
    });
  });
  describe('<ChangePassword route', () => {
    it(
      'should produce a 409 error message if the there is an' +
      ' error with previous password is supplied',
      (done) => {
        chai
          .request(app)
          .put('/api/v1/users/changepassword')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set({ 'x-access-token': userToken })
          .send({ newPassword: 'benny', oldPassword: 'bebrb' })
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(409);
            expect(res.body.message)
              .to
              .equal('Your current password does not ' +
              'match our records, Please Re-enter');
            done();
          });
      }
    );
    it(
      'should be able to change a user\'s password ' +
     'provided a new password is specified',
      (done) => {
        chai
          .request(app)
          .put('/api/v1/users/changepassword')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set({ 'x-access-token': userToken })
          .send({ newPassword: 'newtestuser', oldPassword: 'testuser' })
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(200);
            expect(res.body.message)
              .to
              .equal('testuser, your password has been updated');
            done();
          });
      }
    );
    it(
      'should return a 409 error if new password is set ' +
     'to the old password value',
      (done) => {
        chai
          .request(app)
          .put('/api/v1/users/changepassword')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set({ 'x-access-token': userToken })
          .send({ newPassword: 'newtestuser', oldPassword: 'newtestuser' })
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(409);
            expect(res.body.message)
              .to
              .equal('You cannot use a previous password');
            done();
          });
      }
    );
  });
  describe('<Userlist route', () => {
    it('should return 200 when displaying all users', (done) => {
      chai
        .request(app)
        .get('/api/v1//admin/getuserlist')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body.users)
            .to
            .have
            .length(3);
          expect(res.body.users)
            .to
            .be
            .an('array');
          done();
        });
    });
  });
  describe('<Userlevellist route', () => {
    it('should return 200 when displaying all user levels', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/getuserlevellist')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body.userLevels)
            .to
            .have
            .length(4);
          expect(res.body.userLevels)
            .to
            .be
            .an('array');
          done();
        });
    });
  });
  describe('<Get User route', () => {
    it('should return 200 when get a seleted user', (done) => {
      chai
        .request(app)
        .get(`/api/v1/admin/users/${userId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body.user.username)
            .to
            .equal('testuser');
          expect(res.body.user.userLevel)
            .to
            .equal(2);
          expect(res.body.user)
            .to
            .be
            .an('object');
          done();
        });
    });
  });
});
