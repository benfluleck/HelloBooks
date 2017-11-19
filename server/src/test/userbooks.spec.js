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
let zerobookId;
let testbookId;
let token;
const testdate = new Date('2018-11-18');
const nulluserId = '';


describe('HelloBooks', () => {
  before((done) => {
    Books
      .create({
        title: 'Eze goes to school',
        author: 'Benny Ogidan',
        category: 'Fiction',
        quantity: 20,
        description: 'Test',
        bookimage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
      });
    Books
      .create({
        title: 'Eze continues to go to school',
        author: 'Benny Ogidan',
        category: 'Fiction',
        quantity: 0,
        description: 'Test',
        bookimage: 'Test Image'
      })
      .then((book) => {
        zerobookId = book.id;
      });

    Books
      .create({
        title: 'Amarachi continues to go to school',
        author: 'Benny Ogidan',
        category: 'Fiction',
        quantity: 1,
        description: 'Test',
        bookimage: 'Test Image'
      })
      .then((book) => {
        testbookId = book.id;
      });
    User.create({
      firstname: faker
        .name
        .firstName(),
      lastname: faker
        .name
        .lastName(),
      username: 'Fidelis',
      password: 'bennyogidan',
      passwordConfirmation: 'bennyogidan',
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
      .catch(() => {
        console.log('Error in the User seeding');
      });
  });

  describe('/POST loan a book', () => {
    it('should allow an authenticated user to loan a book', (done) => {
      const userbook = {
        bookId: bookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          done();
        });
    });
    it('should not allow loans without a specified return date', (done) => {
      const userbook = {
        bookId: bookId.toString(),
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal('Please specify a valid return date');
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });

    it('should be able to borrow another book after first loan', (done) => {
      const userbook = {
        bookId: testbookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal('Amarachi continues to go to school succesfully loaned');
          expect(res.status)
            .to
            .equal(201);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not be able to borrow the same book twice', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal('You have already borrowed this book');
          expect(res.status)
            .to
            .equal(409);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not be able to borrow book if the user id is invalid', (done) => {
      const userbook = {
        bookId: bookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post(`/api/v1/users/${nulluserId}/books`)
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should not be able to borrow book with previous functioning route', (done) => {
      const userbook = {
        bookId: bookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/2/books')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal(undefined);
          expect(res.status)
            .to
            .equal(404);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not be able to borrow a book if bookId cannot be found', (done) => {
      const userbook = {
        bookId: 500,
        returndate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal('Sorry we can\'t find this book or all copies of this book are on loan');
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should not be able to borrow a book if a valid return date is not inputted', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
        returndate: 'Invalid date'
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal('Please provide a valid return date');
          expect(res.status)
            .to
            .equal(422);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('should not be able to borrow a book if a valid return date is not inputted', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
        returndate: 2108
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(500);
          done();
        });
    });
    it('should not be able to borrow a book if book quantity = 0', (done) => {
      const userbook = {
        userId,
        bookId: zerobookId,
        returndate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to
            .equal('Sorry we can\'t find this book or all copies of this book are on loan');
          expect(res.status)
            .to
            .equal(404);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });

  describe('/GET should return a borrow history ', () => {
    it('should return a list of books loaned by the user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/borrowedbooks')
        .set('Accept', 'application/x-www-form-urlencoded')
        .query({ returned: false })
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should not return a borrow list if return query is not set', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/borrowedbooks')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
  });


  // Edit a book
  describe('/PUT Return book', () => {
    it('should be able to return a book with a book id', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', token)
        .send({ bookId })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          done();
        });
    });
    it('should not be able to return a book they have not borrowed', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', token)
        .send({ bookId: 7 })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to.equal('You did not borrow this book');
          expect(res.status)
            .to
            .equal(409);
          done();
        });
    });
    it('should not be able to return a book with an invalid id they have not borrowed', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', token)
        .send({ bookId: 'one' })
        .end((err, res) => {
          expect(res.error.text).to.equal('invalid input syntax for integer: "one"');
          expect(res.status)
            .to
            .equal(500);
          done();
        });
    });
    it('should not return a book more than once', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', token)
        .send({ bookId })
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to.equal('You did not borrow this book');
          expect(res.status)
            .to
            .equal(409);
          done();
        });
    });
  });
});

/*

Authenticated users
*/
