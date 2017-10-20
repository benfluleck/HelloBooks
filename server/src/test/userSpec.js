/*
eslint-disable no-console
*/

import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import app from '../app';
import db from '../models';

const User = db.User;
const Books = db.Books;
const expect = chai.expect;

dotenv.config();
chai.use(chaiHttp);

let userId;
let bookId;
let token;


describe('HelloBooks', () => {
  before((done) => {
    Books
      .create({
        title: 'Shola comes home',
        author: 'Benny',
        category: 'Fiction',
        quantity: 20,
        description: 'Testewfewwww',
        bookimage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
      });

    // Create a dummy user
    User.create({
      firstname: faker
        .name
        .firstName(),
      lastname: faker
        .name
        .lastName(),
      username: 'Benny',
      password: 'benny',
      passwordConfirmation: 'benny',
      email: faker
        .internet
        .email()
    })
      .then((user) => {
        userId = user.id;
        token = jwt.sign({
          id: user.id,
          email: user.email,
          username: user.username,
          firstname: user.firstname
        }, process.env.JWT_SECRET);
        done();
      })
      .catch((error) => {
        console.log('Error in the User seeding', error, '????????');
        done();
      });
  });

  /*
  * Unauthenticated user tests
  */
  describe('/GET', () => {
    it('Only authenticated users are allowed to view books', (done) => {
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
    it('Only authenticated users are allowed to see the book list', (done) => {
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

  describe('/POST  Signing up a user', () => {
    it('All users are allowed to register, Sign up successful', (done) => {
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
            .equal(201);
          done();
        });
    });
    it('Should throw a validation error for invalid user data', (done) => {
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
    it('Should throw a validation error for invalid user data', (done) => {
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
    it('Only authenticated users allowed to create books', (done) => {
      chai
        .request(app)
        .post('/api/v1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          done();
        });
    });
    it('Only authenticated users allowed to loan', (done) => {
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
    it('Only authenticated users allowed to edit books', (done) => {
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
    it('Only authenticated users allowed to return books', (done) => {
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

  describe('Authentication', () => {
    it('rejects invalid user', (done) => {
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
    it('No authorization due to no token', (done) => {
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
    it('it responds with 404 status code if bad username or password', (done) => {
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
    it('administrators can create books', (done) => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'Learn Java',
          author: 'Sleeping Master',
          category: 'Learning',
          quantity: 39,
          description: 'Learn Java in 3hours',
          bookimage: 'Test'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          expect(res.body.message)
            .to
            .equal('Learn Java has been added to the library');
          done();
        });
    });
    it('The same book cannot be re-added', (done) => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'Shola comes home',
          author: 'Benny',
          category: 'Fiction',
          quantity: 20,
          description: 'This needs to be a long description',
          bookimage: 'Test Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(409);
          expect(res.body.message)
            .to
            .equal('A book with the same title and author already exists in the library');
          done();
        });
    });
    it('Error in the desciption', (done) => {
      chai
        .request(app)
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'Benedict goes to school',
          author: 'Benny',
          category: 'Fiction',
          quantity: 20,
          description: 'This ',
          bookimage: 'Test Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it('404 for Users that do not exist', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'UnknownUser', password: 'error' })
        .end((err, res) => {
          token = res.body.token;
          const response = res.body;
          expect(response.message).to.equal('UnknownUser does not exist, Go to SignUp');
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('Should validate username', (done) => {
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
    it('Should validate a password for a user', (done) => {
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
            .equal(400);
          done();
        });
    });
    it('it responds with 200 status code if good username or password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: 'benny' })
        .end((err, res) => {
          token = res.body.token;
          expect(res.status)
            .to
            .equal(201);
          done();
        });
    });
    it('validates that the new user is unique', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ 'x-access-token': token })
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
    it('validates that the new user\'s email is unique', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set({ 'x-access-token': token })
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
        .set({ 'x-access-token': token })
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
    it('it returns successful login if user name and password', (done) => {
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
});

/*
Authenticated users
*/
