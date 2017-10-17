import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../models';


const User = db.User;
const Books = db.Books;
const expect = chai.expect;

chai.use(chaiHttp);


let bookId;
let token;
const limit = 1;
const offset = 0;
describe('HelloBooks', () => {
  before((done) => {
    Books.destroy({ where: {} });
    User.destroy({ where: {} });

    Books
      .create({
        title: 'Shola comes home',
        author: 'Benny Ogidan',
        category: 'Fiction',
        quantity: 20,
        description: 'Test',
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
      passwordConfirmation: 'benny',
      email: faker
        .internet
        .email()
    });

    chai
      .request(app)
      .post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'Benny',
        password: 'benny',
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res.status)
          .to
          .equal(200);
        done();
      });
  });

  /*
  * Unauthenticated user tests
  */
  describe('/POST', () => {
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
  });
  describe('/GET', () => {
    it('should return books when given a limit and an offset', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': token })
        .query({
          limit,
          offset,
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length).to.be.equal(limit);
          done();
        });
    });
  });

  // Edit a book
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
  });
});

/*

Authenticated users
*/
