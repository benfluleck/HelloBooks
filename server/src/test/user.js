import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';
import db from '../models';


const User = db.User;
const Books = db.Books;
const expect = chai.expect;

chai.use(chaiHttp);





db.sequelize.sync({});
describe('HelloBooks', () => {
  let userId;
  let bookId;
  let token;
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
    }).then((user) => {
      userId = user.id;
    });

    done();
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

  describe('/POST ', () => {
    it('All users are allowed to register, Sign up successful', (done) => {
      const email = faker.internet.email();
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
          expect(res.status).to.be.equal(401);
          done();
        });
    });
    it('No authorization due to no token', (done) => {
      chai
        .request(app)
        .post('/api/v1/users/books')
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });
  /*
   Authenticated users Tests
   */
  describe('POST /login', () => {
    it('it responds with 401 status code if bad username or password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: faker
            .internet
            .userName(),
          password: faker.internet.password
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(400);
          done();
        });
    });
    it('should prevent non authenticated user from creating books', (done) => {
      server
        .post('/api/v1/books')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          title: 'Learn SQL',
          author: 'SQL Master',
          description: 'Learn & Master SQL in 48hours',
          quantity: 39,
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body.success).to.equal(true);
          expect(res.statusCode).to.equal(200);
          done();
        });

        it('The same book cannot be re-added', (done) => {
          server
            .post('/api/v1/books')
            .set('Accept', 'application/x-www-form-urlencoded')
            .set('x-access-token', token)
            .send({
              title: 'Shola comes home',
              author: 'Benny Ogidan',
              category: 'Fiction',
              quantity: 20,
              description: 'Test',
              bookimage: 'Test Image'
            })
            .end((err, res) => {
              expect(res.body.success).to.equal(false);
              expect(res.status).to.equal(409);
              done();
            });
        });
    
      
  
    it('it responds with 200 status code if good username or password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'Benny',
          password: 'benny'
        })
        .end((err, res) => {
          token = res.body.token;
          expect(res.status)
            .to
            .equal(200);
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
          expect(res.status).to.be.equal(409);
          done();
        });
    });
    it('it returns successful login if user name and password', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'Benny',
          password: 'benny'
        })
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.body)
            .have
            .property('token');
          done();
        });
    });
  });
});
/*
Authenticated users
*/
