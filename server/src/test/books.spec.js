/*
eslint-disable no-console
*/

import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import app from '../app';
import db from '../models';


dotenv.config();


const { Books } = db;
const expect = chai.expect;

chai.use(chaiHttp);


let bookId;
let token = '';
const testdate = new Date('2017-12-01');
let limit;

describe('HelloBooks', () => {
  before((done) => {
    Books
      .create({
        title: 'Shola comes home',
        author: 'Benny',
        categoryId: '1',
        quantity: 20,
        description: 'Test',
        bookImage: 'Test Image'
      })
      .then((book) => {
        bookId = book.id;
        done();
      })
      .catch(() => {
        console.log('Error in the Book seeding');
      });
  });

  describe('Authentication', () => {
    it('should return 201 when a regular administrator is created', (done) => {
      chai.request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'ogidan',
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
          username: 'ogidan',
          password: 'boooboo'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          token = res.body.token;
          done();
        });
    });
  });
  describe('Books', () => {
    it('should display all books from the data', (done) => {
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
    it('should return books when given a default limit and an offset', (done) => {
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
  describe('Edit books', () => {
    it('should edit a selected book from the database', (done) => {
      chai
        .request(app)
        .put(`/api/v1/admin/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
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
          done();
        });
    });
    it('should not edit a selected book if a field value is set to empty', (done) => {
      chai
        .request(app)
        .put(`/api/v1/admin/books/${bookId}`)
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
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
          done();
        });
    });
    it('should throw an error if category Id is not defined', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'The Chronicles of Andela',
          author: 'C.S. Lewis',
          quantity: '23',
          description: 'This is a test',
          bookImage: 'Image'
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should allow administrators to create books', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
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
            .equal('Learn Java has been added to the library, Category: Drama');
          done();
        });
    });
    it('should reject the addition of the same book', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'Benny goes to school',
          author: 'Andela Human',
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
            .equal('A book with the same title and author already exists in the library');
          done();
        });
    });
    it('should return a 400 response for a book with an incomplete description', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
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
    it('should allow only authenticated users allowed to create books', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(401);
          done();
        });
    });
    it('should return 200 when searching all books', (done) => {
      chai.request(app).get('/api/v1/books/search?searchTerm=Ben').set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should return 200 when searching all books in a category', (done) => {
      chai.request(app).get('/api/v1/books/search?searchTerm=Ben&categoryId=1').set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should return 400 when search parameter is null', (done) => {
      chai.request(app).get('/api/v1/books/search?searchTerm=').set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it('should return 404 when no books match search criteria', (done) => {
      chai.request(app).get('/api/v1/books/search?searchTerm=999999').set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    });
    it('should return 200 when getting a single book', (done) => {
      chai.request(app).get('/api/v1/books/1').set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should return 400 if the bookId is not valid', (done) => {
      chai.request(app).get('/api/v1/books/sfgh').set('x-access-token', token)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it(
      'should return 404 when getting a single book if it does not exist',
      (done) => {
        chai.request(app).get('/api/v1/books/100').set('x-access-token', token)
          .end((err, res) => {
            expect(res.status)
              .to
              .equal(404);
            done();
          });
      }
     );
    it('should throw an error if the selected book undefined', (done) => {
      chai
        .request(app)
        .put('/api/v1/admin/books/')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', token)
        .send({
          title: 'The Chronicles of Andela',
          author: 'C.S. Lewis',
          category: 4,
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
  describe('/POST loan a book', () => {
    it('should allow an authenticated user to loan a book', (done) => {
      const userbook = {
        bookId: bookId.toString(),
        returnDate: testdate
      };
      chai
        .request(app)
        .post('/api/v1/users/loanbook')
        .set('x-access-token', token)
        .send(userbook)
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
  });

  describe('Delete books', () => {
    it('should allow only administrators are allowed to delete books', (done) => {
      chai
        .request(app)
        .delete('/api/v1/admin/books/2')
        .set('x-access-token', token)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(200);
          done();
        });
    });
    it('should allow only all books in the database to be deleted', (done) => {
      chai
        .request(app)
        .delete('/api/v1/admin/books/344')
        .set('x-access-token', token)
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
        .set('x-access-token', token)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(409);
          done();
        });
    });
    it('should allow books with valid ids to be loaned', (done) => {
      chai
        .request(app)
        .delete('/api/v1/admin/books/thisbook')
        .set('x-access-token', token)
        .set('Accept', 'application/x-www-form-urlencoded')
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
  });
});

