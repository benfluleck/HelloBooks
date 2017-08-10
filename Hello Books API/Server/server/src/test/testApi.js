import test from './test';
import sequelize from '../models/index';

// import faker from 'faker';
// import chai from 'chai';
// import chaiHttp from 'chai-http';

// // import sequelize from '../models';
// import app from '../app';
// // import mocha from 'mocha';
// import db from '../models';
// const User = db.User;
// const Books = db.Books;

// --compilers js:babel-core/register
// Questions: Classes , ES6 problems maybe babel

// const User = require('../models').User;
// let Books = require('../models').Books;
// During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
// const chai = test.chai;
// const chaiHttp = test.chaiHttp;
// const faker = test.faker;
// const expect = test.expect;
// const Books = test.Books;
// const User = test.User;
// const app = test.app;
import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';

// import sequelize from '../models';
import app from '../app';
// import mocha from 'mocha';
import db from '../models';

const User = db.User;
const Books = db.Books;
// const server = require('../routes/index');

const expect = chai.expect;


chai.use(chaiHttp);
// Our parent block


let bookid;
let userId;
let token;
// Middleware for database
describe('HelloBooks', () => {
 before((done) => {
  Books.destroy({ where: {} });
  User.destroy({ where: {} });
  // create dummy books
  Books.create({
   title: 'Shola comes home',
   author: 'Benny Ogidan',
   category: 'Fiction'
  }).then((book) => {
   bookid = book.id;
  });

  // Create a dummy user
  User.create({
   firstname: faker.name.firstName(),
   lastname: faker.name.lastName(),
   username: 'Benny',
   password: 'benny',
   password_confirmation: 'benny',
   email: faker.internet.email()
  }).then((user) => {
   userId = user.id;
  });

  done();
 });

 /*
  *Unauthenticated user tests
  */
 describe('/GET', () => {
  it('Only authenticated users allowed to view books', (done) => {
   chai
    .request(app)
    .get('/api/books/')
    .end((err, res) => {
     expect(res.status).to.equal(403);
     done();
    });
  });
  it('Only authenticated users allowed to see the book list', (done) => {
   chai.request(app).get('/api/users/1/books').end((err, res) => {
    expect(res.status).to.equal(403);
    done();
   });
  });
 });

 describe('/POST ', () => {
  it('All users are allowed to register, Sign up successful', (done) => {
   chai.request(app).post('/api/users/signup').send({ username: faker.internet.userName(), password: faker.internet.password }).end((err, res) => {
    expect(201);
    done();
   });
  });
  it('Only authenticated users allowed to create books', (done) => {
   chai.request(app).post('/api/books/').end((err, res) => {
    expect(res.status).to.equal(403);
    done();
   });
  });
  it('Only authenticated users allowed to loan', (done) => {
   chai.request(app).post('/api/users/1/books').end((err, res) => {
    expect(res.status).to.equal(403);
    done();
   });
  });
 });
 describe('/PUT', () => {
  it('Only authenticated users allowed to edit books', (done) => {
   chai.request(app).put('/api/books/1').end((err, res) => {
    expect(res.status).to.equal(403);
    done();
   });
  });
  it('Only authenticated users allowed to return books', (done) => {
   chai.request(app).put('/api/users/1/books').end((err, res) => {
    expect(res.status).to.equal(403);
    done();
   });
  });
 });

 /*
   Authenticated users Tests
   */
 describe('POST /login', () => {
  it('it responds with 401 status code if bad username or password', (done) => {
   chai.request(app).post('api/users/signin').send({ username: faker.internet.userName(), password: faker.internet.password })
    .end((err, res) => {
     expect(403);
     done();
    });
  });
  // Authenticated users
  it('it responds with 200 status code if good username or password', (done) => {
   chai.request(app)
    .post('/api/users/signin')
    .send({ username: 'Benny', password: 'benny' })
    .end((err, res) => {
     expect(res.status).to.equal(200);
     done();
    });
  });
  // Authenticate the user with a token
  it('it returns succesful login if user name and password', (done) => {
   chai.request(app).post('/api/users/signin')
    .send({ username: 'Benny', password: 'benny' })
    .end((err, res) => {
     token = res.body.token;
     console.log(res.body);
     // if (err) return done(err);
     expect('Content-Type', /json/);
     expect(res.body).have.property('token');

     done();
    });
  });

  // Loan a book need to change the date
  it('it allows the user to loan a book', (done) => {
   const userbook = {
    userid: userId,
    bookid,
    date: '2016-08-09 04:05:02'
     // return_status: false
   };

   chai.request(app).post(`/api/users/${userbook.userid}/books`).set('x-access-token', token).send(userbook)
    .end((err, res) => {
     expect(res.status).to.equal(201);
     done();
    });
  });

  // Retrieves
  describe('/GET', () => {
   it('It retrieves all books from the data', (done) => {
    chai.request(app).get('/api/books')
     .set('x-access-token', token)
     .end((err, res) => {
      // bookid = Books.id
      expect(res.status).to.equal(200);
      done();
     });
   });
  });
  // Edit a book
  describe('/PUT', () => {
   it('Edit a select book from the data', (done) => {
    chai.request(app).put(`/api/books/${bookid}`).set('x-access-token', token).send({
      title: 'The Chronicles of Andela',
      author: 'C.S. Lewis',
      category: 'Action'
     })
     .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
     });
   });

   // return books
   it('it should return a book', (done) => {
    chai.request(app).put(`/api/users/${userId}/books`).set('x-access-token', token).send({
      bookid,
      userid: userId
     })
     .end((err, res) => {
      expect(res.status).to.equal(200);

      done();
     });
   });
  });
 });

 after((done) => {
  //     User.drop();
  //     Books.drop();
  sequelize.sequelize.sync({ force: true });

 });
});

/*

Authenticated users
*/