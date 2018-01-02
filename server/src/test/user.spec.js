import * as log from 'loglevel';

import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import app from '../app';
import db from '../models';

const { User } = db;
const { Books } = db;
const { expect } = chai;

dotenv.config();
chai.use(chaiHttp);

let userId;
let bookId;
let token;
let userToken;


describe('HelloBooks', () => {
  before((done) => {
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
    User.create({
      firstname: faker
        .name
        .firstName(),
      lastname: faker
        .name
        .lastName(),
      username: 'Benny',
      password: 'benny',
      isAdmin: false,
      passwordConfirmation: 'benny',
      email: faker
        .internet
        .email()
    })
      .then((user) => {
        userId = user.id;
        userToken = jwt.sign({
          id: user.id,
          email: user.email,
          isAdmin: true
        }, process.env.JWT_SECRET);
        done();
      })
      .catch((error) => {
        log.debug('Error in seeding the db', error);
        done();
      });
  });

  /*
  * Unauthenticated user tests
  */
  describe('/GET', () => {
    it('should allow only authenticated users to view books', (done) => {
      chai
        .request(app)
        .get('/api/v1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
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
          done();
        });
    });
  });

  describe('Authentication', () => {
    it('should return 201 when a regular administrator is created', (done) => {
      chai.request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'testadmin',
          password: 'boooboo',
          passwordConfirmation: 'boooboo',
          firstname: 'Benny',
          isAdmin: true,
          email: faker.internet.email(),
          lastname: faker.name.lastName()
        })
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should return 200 when a administrator signs in', (done) => {
      chai.request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'testadmin',
          password: 'boooboo'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          token = res.body.token;
          done();
        });
    });
  });

  describe('User level', () => {
    it('should return 409 when level is the same as user level', (done) => {
      chai.request(app).put('/api/v1/admin/changeuserlevel').set('x-access-token', token)
        .send({
          newLevelId: '1',
          userId: 1
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    });
    it('should return 200 when level change is successful', (done) => {
      chai.request(app).put('/api/v1/admin/changeuserlevel').set('x-access-token', token)
        .send({
          newLevelId: '2',
          userId: 1
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should return 400 when newLevelId is null', (done) => {
      chai.request(app).put('/api/v1/admin/changeuserlevel').set('x-access-token', token)
        .send({
          userId: 1
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should return 404 when new level does not exist', (done) => {
      chai.request(app).put('/api/v1/admin/changeuserlevel').set('x-access-token', token)
        .send({
          newLevelId: '20',
          userId: 1
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('should return 404 when the user is not found ', (done) => {
      chai.request(app).put('/api/v1/admin/changeuserlevel').set('x-access-token', token)
        .send({
          newLevelId: '2',
          userId: 445454
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('Signing up a user', () => {
    it('should sign up users who fill the correct parameters for the signup form', (done) => {
      const email = faker
        .internet
        .email();
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          firstname: faker
            .name
            .firstName(),
          lastname: faker
            .name
            .lastName(),
          username: 'samplename',
          password: 'password',
          passwordConfirmation: 'password',
          email
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          done();
        });
    });
    it('should throw a validation error for invalid user data', (done) => {
      const email = faker
        .internet
        .email();
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          firstname: faker
            .name
            .firstName(),
          lastname: faker
            .name
            .lastName(),
          password: 'password',
          passwordConfirmation: 'password',
          email
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it('should throw a validation error for invalid user data', (done) => {
      const email = 'nenemail.com';
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          firstname: faker
            .name
            .firstName(),
          lastname: faker
            .name
            .lastName(),
          username: faker
            .internet
            .userName(),
          password: 'password',
          passwordConfirmation: 'password',
          email
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(422);
          done();
        });
    });
    it('should allow only authenticated users allowed to loan', (done) => {
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          done();
        });
    });
  });
  describe('/PUT', () => {
    it('should allow only authenticated users to edit books', (done) => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          done();
        });
    });
    it('should allow only authenticated users to return books', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/${userId}/books`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          done();
        });
    });
  });
  describe('Authentication processes', () => {
    it('should reject invalid user', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/books')
        .set({ 'x-access-token': '12345' })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(401);
          done();
        });
    });
    it('should reject authorization for users due to no token', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/books')
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(401);
          done();
        });
    });
    it('should respond with 404 status code if bad username or password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: faker
            .internet
            .userName(),
          password: faker
            .internet
            .password()
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should ensure all signup fields are required', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: faker.internet.userName(),
          email: faker.internet.email(),
          password: 'testpassword',
          passwordConfirmation: 'testpassword',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('Firstname is invalid');
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should ensure all signup fields are defined', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          usename: '',
          email: '',
          password: '',
          passwordConfirmation: '',
        })
        .end((err, res) => {
          expect(res.body.message).to.equal('This email address you have provided is invalid');
          done();
        });
    });
  });
  /*
   Authenticated users Tests
   */
  describe('POST /books', () => {
    it('should throw a 404 error for Users that do not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'UnknownUser', password: 'error' })
        .end((err, res) => {
          token = res.body.token;
          const response = res.body;
          expect(response.message).to.equal('UnknownUser does not exist, Make sure you are signed up');
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should validate username', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: '' })
        .end((err, res) => {
          token = res.body.token;
          const response = res.body;
          expect(response.message).to.equal('Password is too short');
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it('should validate a password for a user', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: 'nnnnnnn' })
        .end((err, res) => {
          token = res.body.token;
          const response = res.body;
          expect(response.message).to.equal('Wrong Credentials');
          expect(res.status)
            .to
            .equal(403);
          done();
        });
    });
    it('should respond with 200 status code if good username or password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: 'benny' })
        .end((err, res) => {
          userToken = res.body.token;
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should validate that the new user is unique', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ 'x-access-token': userToken })
        .send({
          username: 'Benny',
          firstname: 'Benn',
          lastname: 'Nyotu',
          email: 'ben@gmail.com',
          password: 'benny',
          passwordConfirmation: 'benny'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(409);
          done();
        });
    });
    it('should validate that the new user\'s email as unique', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ 'x-access-token': userToken })
        .send({
          username: 'Homer',
          firstname: 'Homer',
          lastname: 'Simpson',
          email: 'sample@email.com',
          password: 'benny',
          passwordConfirmation: 'benny'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(409);
          done();
        });
    });

    it('should not create a user if the password does not match', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ 'x-access-token': userToken })
        .send({
          username: 'Homer',
          firstname: 'Homer',
          lastname: 'Simpson',
          email: 'ben@gmail.com',
          password: 'benny',
          passwordConfirmation: 'benny23'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(422);
          done();
        });
    });
    it('should return successful login if user name and password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: 'benny' })
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.body)
            .have
            .property('token');
          done();
        });
    });
    it('should require the username field', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: '', password: 'benny' })
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.status)
            .to
            .be
            .equal(400);
          done();
        });
    });
    it('should require the password field', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: '' })
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.status)
            .to
            .be
            .equal(400);
          done();
        });
    });
  });
  describe('Change password', () => {
    it('should produce a 409 error message if the there is an error with previous password is supplied', (done) => {
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
          done();
        });
    });
    it('should be able to change a user\'s password provided a new password is specified', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/changepassword')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ 'x-access-token': userToken })
        .send({ newPassword: 'bbbbvvvvvvvv', oldPassword: 'benny' })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
  });
});

/*
Authenticated users
*/
