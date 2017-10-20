/*
eslint-disable no-console
*/

import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import app from '../app';
import db from '../models';


dotenv.config();


const User = db.User;
const Books = db.Books;
const expect = chai.expect;

chai.use(chaiHttp);


let bookId;
let token;
let limit;

describe('HelloBooks', () => {
  before((done) => {
    Books
      .create({
        title: 'Shola comes home',
        author: 'Benny O',
        category: 'Fiction',
        quantity: 20,
        description: 'Test',
        bookimage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
      })
      .catch(() => {
        console.log('Error in the Book seeding');
      });

    User.create({
      firstname: faker
        .name
        .firstName(),
      lastname: faker
        .name
        .lastName(),
      username: 'Bunmi',
      password: 'bennyogidan',
      passwordConfirmation: 'bennyogidan',
      email: faker
        .internet
        .email()
    }).then((user) => {
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

  /*
  * Unauthenticated user tests
  */
  describe('/GET return a book list', () => {
    it('It retrieves all books from the data', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should return books when given a default and an offset', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': token })
        .query({
          limit: 2
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length).to.be.equal(2);
          done();
        });
    });
    it('should return books with a given limit and a default offset', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': token })
        .query({
          limit: 1
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length).to.be.equal(1);
          done();
        });
    });
    it('should return books with a given limit and a given offset', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': token })
        .query({
          limit: 1,
          offset: 1,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length).to.be.equal(1);
          done();
        });
    });
    it('should return books with a default limit and a given offset', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': token })
        .query({
          limit,
          offset: 1
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length).to.be.equal(3);
          done();
        });
    });
  });


  describe('/PUT', () => {
    it('Edit a select book from the data', (done) => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'The Chronicles of Andela',
          author: 'C.S. Lewis',
          category: 'Action',
          quantity: '23',
          description: 'This is a test',
          bookimage: 'Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(202);
          done();
        });
    });
    it('Will not edit if a field is set to empty', (done) => {
      chai
        .request(app)
        .put(`/api/v1/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'The Chronicles of Andela',
          author: '',
          category: 'Action',
          quantity: '23',
          description: 'This is a test',
          bookimage: 'Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it('Book is not found when bookid is undefined or null', (done) => {
      chai
        .request(app)
        .put('/api/v1/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'The Chronicles of Andela',
          author: 'C.S. Lewis',
          category: 'Action',
          quantity: '23',
          description: 'This is a test',
          bookimage: 'Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
  });
});

/*

Authenticated users
*/
