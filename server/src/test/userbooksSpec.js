import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../models';


const User = db.User;
const Books = db.Books;
const expect = chai.expect;

chai.use(chaiHttp);


let userId;
let bookId;
let token;
const testdate = new Date('2017-11-18');

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
    }).then((user) => {
      userId = user.id;
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

  describe('/POST loan a book', () => {
    // Loan a book need to change the date
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
    it('Loans are not pwermitted without a return date', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString()
      };
      chai
        .request(app)
        .post(`/api/v1/users/${userId}/books`)
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message).to.equal('Please specify a valid return date');
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    // Edit a book
    describe('/PUT edit a book', () => {
      it('it should return a book', (done) => {
        chai
          .request(app)
          .put(`/api/v1/users/${userId}/books`)
          .set('x-access-token', token)
          .send({ bookId: bookId.toString() })
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(202);

            done();
          });
      });
    });
  });
});

/*

Authenticated users
*/
