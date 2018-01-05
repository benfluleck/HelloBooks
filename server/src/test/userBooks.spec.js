import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../models';
import usrToken from './helpers/usrToken';

const { Books } = db;
const { expect } = chai;

chai.use(chaiHttp);

let userId;
let bookId;
let zerobookId;
let testbookId;
let userToken = '';
let adminToken = '';
const testdate = new Date(Date.now());
const nulluserId = '';

describe('UserBooks', () => {
  before((done) => {
    usrToken().then((response) => {
      userToken = response.userToken;
      adminToken = response.adminToken;
      done();
    });
    Books
      .create({
        title: 'Eze goes to school',
        author: 'Benny Ogidan',
        categoryId: '2',
        quantity: '20',
        description: 'Test',
        bookImage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
      });
    Books
      .create({
        title: 'Eze continues to go to school',
        author: 'Benny Ogidan',
        categoryId: '3',
        quantity: '0',
        description: 'Test',
        bookImage: 'Test Image'
      })
      .then((book) => {
        zerobookId = book.id;
      });

    Books
      .create({
        title: 'Amarachi continues to go to school',
        author: 'Benny Ogidan',
        categoryId: '2',
        quantity: '1',
        description: 'Test',
        bookImage: 'Test Image'
      })
      .then((book) => {
        testbookId = book.id;
      });
  });

  describe('<Loan Books', () => {
    it('should allow an authenticated user to loan a book', (done) => {
      const userbook = {
        bookId: bookId.toString(),
        returnDate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', userToken)
        .send(userbook)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should not allow loans without a specified return date', (done) => {
      const userbook = {
        bookId: bookId.toString()
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', userToken)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message)
            .to
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
        returnDate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', userToken)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message)
            .to
            .equal('Amarachi continues to go to school successfully loaned');
          expect(res.status)
            .to
            .equal(200);
          expect(res.body)
            .to
            .be
            .an('object');
          done();
        });
    });
    it('should not be able to borrow the same book twice', (done) => {
      const userbook = {
        userId,
        bookId: bookId.toString(),
        returnDate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', userToken)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message)
            .to
            .equal('You have already borrowed this book');
          expect(res.status)
            .to
            .equal(409);
          expect(res.body)
            .to
            .be
            .an('object');
          done();
        });
    });
    it(
      'should not be able to borrow book if the user id is invalid'
      , (done) => {
        const userbook = {
          bookId: bookId.toString(),
          returnDate: testdate
        };
        chai
          .request(app)
          .post(`/api/v1/users/${nulluserId}/books`)
          .set('x-access-token', userToken)
          .send(userbook)
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(404);
            done();
          });
      }
    );
    it(
      'should not be able to borrow book with previous functioning route'
      , (done) => {
        const userbook = {
          bookId: bookId.toString(),
          returnDate: testdate
        };
        chai
          .request(app)
          .post('/api/v1/users/2/books')
          .set('x-access-token', userToken)
          .send(userbook)
          .end((err, res) => {
            const response = res.body;
            expect(response.message)
              .to
              .equal(undefined);
            expect(res.status)
              .to
              .equal(404);
            expect(res.body)
              .to
              .be
              .an('object');
            done();
          });
      }
    );
    it(
      'should not be able to borrow a book if bookId cannot be found'
      , (done) => {
        const userbook = {
          bookId: 500,
          returnDate: testdate
        };
        chai
          .request(app)
          .post('/api/v1/users/loanbook')
          .set('x-access-token', userToken)
          .send(userbook)
          .end((err, res) => {
            const response = res.body;
            expect(response.message)
              .to
              .equal('Sorry we can\'t find this book or ' +
                 'all copies of this book are on loan');
            expect(res.status)
              .to
              .equal(404);
            done();
          });
      }
    );
    it(
      'should not be able to borrow a book if a valid ' +
       'return date is not inputted',
      (done) => {
        const userbook = {
          userId,
          bookId: bookId.toString(),
          returnDate: 'Invalid date'
        };
        chai
          .request(app)
          .post('/api/v1/users/loanbook')
          .set('x-access-token', userToken)
          .send(userbook)
          .end((err, res) => {
            const response = res.body;
            expect(response.message)
              .to
              .equal('Please provide a valid return date');
            expect(res.status)
              .to
              .equal(422);
            expect(res.body)
              .to
              .be
              .an('object');
            done();
          });
      }
    );
    it(
      'should not be able to borrow a book ' +
      'if a valid return date is not inputted',
      (done) => {
        const userbook = {
          userId,
          bookId: bookId.toString(),
          returnDate: 2108
        };
        chai
          .request(app)
          .post('/api/v1/users/loanbook')
          .set('x-access-token', userToken)
          .send(userbook)
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(500);
            done();
          });
      }
    );
    it('should not be able to borrow a book if book quantity = 0', (done) => {
      const userbook = {
        userId,
        bookId: zerobookId,
        returnDate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', adminToken)
        .send(userbook)
        .end((err, res) => {
          const response = res.body;
          expect(response.message)
            .to
            .equal('Sorry we can\'t ' +
            'find this book or all copies of this book are on loan');
          expect(res.status)
            .to
            .equal(404);
          expect(res.body)
            .to
            .be
            .an('object');
          done();
        });
    });
  });

  describe('<Get Borrow History', () => {
    it('should return a list of books loaned by the user', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/borrowedbooks')
        .set('Accept', 'application/x-www-form-urlencoded')
        .query({ returned: false })
        .set('x-access-token', userToken)
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
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should return a user\'s loan history', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/getloanhistory')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should return 404 for a user with no overdue books ', (done) => {
      chai
        .request(app)
        .get('/api/v1/users/getoverduebooks')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
  });

  describe('<Return book', () => {
    it('should be able to return a book with a book id', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', userToken)
        .send({ bookId })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should not be able to return a book they have not borrowed', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', userToken)
        .send({ bookId: 7 })
        .end((err, res) => {
          const response = res.body;
          expect(response.message)
            .to
            .equal('You did not borrow this book');
          expect(res.status)
            .to
            .equal(409);
          done();
        });
    });
    it('should not be able to return a book with an ' +
      'invalid id they have not borrowed', (done) => {
      chai
        .request(app)
        .put('/api/v1/users/returnbook')
        .set('x-access-token', userToken)
        .send({ bookId: 'one' })
        .end((err, res) => {
          expect(res.error.text)
            .to
            .equal('invalid input syntax for integer: "one"');
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
        .set('x-access-token', userToken)
        .send({ bookId })
        .end((err, res) => {
          const response = res.body;
          expect(response.message)
            .to
            .equal('You did not borrow this book');
          expect(res.status)
            .to
            .equal(409);
          done();
        });
    });
  });
});

