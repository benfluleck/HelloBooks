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
let token;
const testdate = new Date('2017-11-18');


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
    it('it allows the user to loan a book', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(202);
          done();
        });
    });
    it('loans are not permitted without a return date', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
      };
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
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

    it('should not be able to borrow another book of the same title', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
        returndate: testdate
      };
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
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
    it('should not be able to borrow a book if bookId cannot be found', (done) => {
      const userbook = {
        userId,
        bookId: 500,
        returndate: testdate
      };
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
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
    it('should not be able to borrow a book if quantity === 0', (done) => {
      const userbook = {
        userId,
        bookId: zerobookId,
        returndate: testdate
      };
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
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

  describe('/GET should return a list', () => {
    it('returns a list of books loaned by the user', (done) => {
      chai
        .request(app)
        .get(`/api/v1//users/${userId}/books`)
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
    it('does not return a list if return query is not set', (done) => {
      chai
        .request(app)
        .get(`/api/v1//users/${userId}/books`)
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
    it('users should be able to return a book with a book id', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/${userId}/books`)
        .set('x-access-token', token)
        .send({ bookId })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          done();
        });
    });
    it('users should be able to return a book they have not borrowed', (done) => {
      chai
        .request(app)
        .put(`/api/v1/users/${userId}/books`)
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
  });
});

/*

Authenticated users
*/
