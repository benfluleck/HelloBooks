import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../models';
import usrToken from './helpers/usrToken';

const { Books } = db;
const { expect } = chai;

chai.use(chaiHttp);

let bookId;
let userToken = '';
let adminToken = '';
const testdate = new Date(Date.now());
let limit;

describe('Books', () => {
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
        quantity: 20,
        description: 'Test',
        bookImage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
      })
      .catch(() => {});
  });
  describe('<Get Booklist', () => {
    it('should display all books from the data', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body)
            .to
            .be
            .a('object');
          done();
        });
    });
    it(`should return books when given ` +
    `a default limit and an offset`, (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': userToken })
        .query({ limit: 2 })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length)
            .to
            .be
            .equal(2);
          expect(res.body)
            .to
            .be
            .a('object');
          done();
        });
    });
    it(`should return books with a given ` +
    `limit and a default offset`, (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': userToken })
        .query({ limit: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length)
            .to
            .be
            .equal(1);
          done();
        });
    });
    it('should return books with a given limit and a given offset', (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': userToken })
        .query({ limit: 1, offset: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length)
            .to
            .be
            .equal(1);
          done();
        });
    });
    it(`should return books with a ` +
    `default limit and a given offset`, (done) => {
      chai
        .request(app)
        .get('/api/v1/books')
        .set({ 'x-access-token': userToken })
        .query({ limit, offset: 1 })
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(200);
          expect('Content-Type', /json/);
          expect(res.body.books.length)
            .to
            .be
            .equal(3);
          done();
        });
    });
  });
  describe('<Edit books', () => {
    it('should edit a selected book from the database', (done) => {
      chai
        .request(app)
        .put(`/api/v1/admin/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'The Chronicles of Andela',
          author: 'C.S. Lewis',
          categoryId: '2',
          quantity: '23',
          description: 'This is a test',
          bookImage: 'Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect('Content-Type', /json/);
          expect(res.body.message)
            .to
            .equal('The Chronicles of Andela has been updated');
          done();
        });
    });
    it(`should not edit a selected ` +
    `book if a field value is set to empty`, (done) => {
      chai
        .request(app)
        .put(`/api/v1/admin/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'The Chronicles of Andela',
          author: '',
          categoryId: '2',
          quantity: '23',
          description: 'This is a test',
          bookimage: 'Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          expect(res.body.message)
            .to
            .equal('This author\'s name is invalid');
          done();
        });
    });
    it(
      'should throw a 404 errror if book to be edited is not defined',
      (done) => {
        chai
          .request(app)
          .put('/api/v1/admin/books/')
          .set('Accept', 'application/x-www-form-urlencoded')
          .set('x-access-token', adminToken)
          .send({
            title: 'The Chronicles of Andela',
            author: 'C.S. Lewis',
            quantity: '23',
            categoryId: '2',
            description: 'This is a test',
            bookImage: 'Image'
          })
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(404);
            done();
          });
      }
    );
  });
  describe('<Create books', () => {
    it('should allow administrators to create books', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'Learn Java',
          author: 'Sleeping Master',
          categoryId: '2',
          quantity: '39',
          description: 'Learn Java in 3hours',
          bookImage: 'Test'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          expect(res.body.message)
            .to
            .equal(`Learn Java has been added to the library,` +
              `Category: Drama`);
          done();
        });
    });
    it('should reject the addition of the same book', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'Learn Java',
          author: 'Sleeping Master',
          categoryId: '1',
          quantity: '20',
          description: 'This needs to be a long description',
          bookImage: 'Test Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(409);
          expect(res.body.message)
            .to
            .equal(`A book with the same title and ` +
              `author already exists in the library`);
          done();
        });
    });
    it(`should return a 400 response for ` +
      `a book with an incomplete description`, (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .send({
          title: 'Benedict goes to school',
          author: 'Benny O',
          categoryId: '3',
          quantity: '20',
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
    it('should allow only authenticated ' +
      'users allowed to create books', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books/')
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
  describe('<Search books', () => {
    it('should return 200 when searching all books', (done) => {
      chai
        .request(app)
        .get('/api/v1/books/search?searchTerm=Sta')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body.success)
            .to.equal(true);
          done();
        });
    });
    it('should return 200 when searching all books in a category', (done) => {
      chai
        .request(app)
        .get('/api/v1/books/search?searchTerm=Sta&categoryId=1')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          expect(res.body.success)
            .to.equal(true);
          done();
        });
    });
    it('should return 400 when search parameter is null', (done) => {
      chai
        .request(app)
        .get('/api/v1/books/search?searchTerm=')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          expect(res.body.message)
            .to
            .equal('Please enter your search criteria');
          done();
        });
    });
    it('should return 404 when no books match search criteria', (done) => {
      chai
        .request(app)
        .get('/api/v1/books/search?searchTerm=999999')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          expect(res.body.message)
            .to
            .equal('Sorry no books match your search criteria');
          done();
        });
    });
  });
  it('should return 200 when getting a single book', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/books/1')
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        done();
      });
  });
  describe('<Select Book', () => {
    it('should return 400 if the bookId is not valid', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/books/sfgh')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          expect(res.body.message)
            .to
            .equal('Please enter a valid bookId');
          done();
        });
    });
    it('should return 404 when getting a' +
     'single book if it does not exist', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/books/100')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          expect(res.body.message)
            .to
            .equal('This book does not exist in the library');
          done();
        });
    });
  });
  describe('/Loan a book', () => {
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
          expect(res.body.message)
            .to
            .equal('The Chronicles of Andela successfully loaned');
          done();
        });
    });
  });

  describe('Delete books', () => {
    it(
      'should allow only administrators to delete books',
      (done) => {
        chai
          .request(app)
          .delete('/api/v1/admin/books/2')
          .set('x-access-token', userToken)
          .set('Accept', 'application/x-www-form-urlencoded')
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(403);
            done();
          });
      }
    );
    it('should allow only all books in the database to be deleted', (done) => {
      chai
        .request(app)
        .delete('/api/v1/admin/books/344')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should not allow books currently on loan to be deleted', (done) => {
      chai
        .request(app)
        .delete(`/api/v1/admin/books/${bookId}`)
        .set('x-access-token', adminToken)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(409);
          expect(res.body.message)
            .to
            .equal('You can\'t delete this book ' +
            'while there is a copy still out on loan');
          done();
        });
    });
    it('should allow books with valid ids to be loaned', (done) => {
      chai
        .request(app)
        .delete('/api/v1/admin/books/thisbook')
        .set('x-access-token', adminToken)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          expect(res.body.message)
            .to
            .equal('Please enter a valid bookId');
          done();
        });
    });
  });
});
