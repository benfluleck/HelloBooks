'use strict';

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import sequelize from '../models';
var User = _models2.default.User;
// import mocha from 'mocha';


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

var Books = _models2.default.Books;
// const server = require('../routes/index');

var expect = _chai2.default.expect;

_chai2.default.use(_chaiHttp2.default);
// Our parent block


var bookid = void 0;
var userId = void 0;
var token = void 0;
// Middleware for database
describe('HelloBooks', function () {
  before(function (done) {
    Books.destroy({ where: {} });
    User.destroy({ where: {} });
    // create dummy books
    Books.create({
      title: 'Shola comes home',
      author: 'Benny Ogidan',
      category: 'Fiction'
    }).then(function (book) {
      bookid = book.id;
    });

    // Create a dummy user
    User.create({
      firstname: _faker2.default.name.firstName(),
      lastname: _faker2.default.name.lastName(),
      username: 'Benny',
      password: 'benny',
      password_confirmation: 'benny',
      email: _faker2.default.internet.email()
    }).then(function (user) {
      userId = user.id;
    });

    done();
  });

  /*
   *Unauthenticated user tests
   */
  describe('/GET', function () {
    it('Only authenticated users allowed to view books', function (done) {
      _chai2.default.request(_app2.default).get('/api/books/').end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
    it('Only authenticated users allowed to see the book list', function (done) {
      _chai2.default.request(_app2.default).get('/api/users/1/books').end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
  });

  describe('/POST ', function () {
    it('All users are allowed to register, Sign up successful', function (done) {
      _chai2.default.request(_app2.default).post('/api/users/signup').send({ username: _faker2.default.internet.userName(), password: _faker2.default.internet.password }).end(function (err, res) {
        expect(201);
        done();
      });
    });
    it('Only authenticated users allowed to create books', function (done) {
      _chai2.default.request(_app2.default).post('/api/books/').end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
    it('Only authenticated users allowed to loan', function (done) {
      _chai2.default.request(_app2.default).post('/api/users/1/books').end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
  });
  describe('/PUT', function () {
    it('Only authenticated users allowed to edit books', function (done) {
      _chai2.default.request(_app2.default).put('/api/books/1').end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
    it('Only authenticated users allowed to return books', function (done) {
      _chai2.default.request(_app2.default).put('/api/users/1/books').end(function (err, res) {
        expect(res.status).to.equal(403);
        done();
      });
    });
  });

  /*
    Authenticated users Tests
    */
  describe('POST /login', function () {
    it('it responds with 401 status code if bad username or password', function (done) {
      _chai2.default.request(_app2.default).post('api/users/signin').send({ username: _faker2.default.internet.userName(), password: _faker2.default.internet.password }).end(function (err, res) {
        expect(403);
        done();
      });
    });
    // Authenticated users
    it('it responds with 200 status code if good username or password', function (done) {
      _chai2.default.request(_app2.default).post('/api/users/signin').send({ username: 'Benny', password: 'benny' }).end(function (err, res) {
        expect(res.status).to.equal(200);
        done();
      });
    });
    // Authenticate the user with a token
    it('it returns succesful login if user name and password', function (done) {
      _chai2.default.request(_app2.default).post('/api/users/signin').send({ username: 'Benny', password: 'benny' }).end(function (err, res) {
        token = res.body.token;
        console.log(res.body);
        // if (err) return done(err);
        expect('Content-Type', /json/);
        expect(res.body).have.property('token');

        done();
      });
    });

    // Loan a book need to change the date
    it('it allows the user to loan a book', function (done) {
      var userbook = {
        userid: userId,
        bookid: bookid,
        date: '2016-08-09 04:05:02'
        // return_status: false
      };

      _chai2.default.request(_app2.default).post('/api/users/' + userbook.userid + '/books').set('x-access-token', token).send(userbook).end(function (err, res) {
        expect(res.status).to.equal(201);
        done();
      });
    });

    // Retrieves
    describe('/GET', function () {
      it('It retrieves all books from the data', function (done) {
        _chai2.default.request(_app2.default).get('/api/books').set('x-access-token', token).end(function (err, res) {
          // bookid = Books.id
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    // Edit a book
    describe('/PUT', function () {
      it('Edit a select book from the data', function (done) {
        _chai2.default.request(_app2.default).put('/api/books/' + bookid).set('x-access-token', token).send({
          title: 'The Chronicles of Andela',
          author: 'C.S. Lewis',
          category: 'Action'
        }).end(function (err, res) {
          expect(res.status).to.equal(200);
          done();
        });
      });

      // return books
      it('it should return a book', function (done) {
        _chai2.default.request(_app2.default).put('/api/users/' + userId + '/books').set('x-access-token', token).send({
          bookid: bookid,
          userid: userId
        }).end(function (err, res) {
          expect(res.status).to.equal(200);

          done();
        });
      });
    });
  });

  after(function (done) {
    //     User.drop();
    //     Books.drop();
    _index2.default.sequelize.sync({ force: true });
  });
});

/*

Authenticated users
*/