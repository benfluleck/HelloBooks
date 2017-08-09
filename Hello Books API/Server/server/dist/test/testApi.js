'use strict';

var app = require('../app');
var mocha = require('mocha');
var chai = require('chai');
var chaiHttp = require('chai-http');
var db = require('../server/models');
var User = require('../server/models').User;
var Books = require('../server/models').Books;
var server = require('../server/routes/index');
var expect = chai.expect;
var faker = require('faker');
var sequelize = require('../server/models').sequelize;
//--compilers js:babel-core/register
// Questions: Classes , ES6 problems maybe babel


//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
//Our parent block


var bookid = void 0;
var userId = void 0;
//Middleware for database
describe('HelloBooks', function () {
    var token = void 0;

    before(function (done) {
        Books.destroy({ where: {} });
        User.destroy({ where: {} });
        //create dummy books
        var book = Books.create({
            book_title: "Shola comes home",
            books_author: "Benny Ogidan",
            category: "Fiction"
        }).then(function (book) {
            bookid = book.id;
        });
        console.log(bookid);

        //Create a dummy user
        var user = User.create({
            username: "Benny",
            password: "benny",
            email: faker.internet.email()
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
            chai.request(app).get('/api/books/').end(function (err, res) {
                expect(res.status).to.equal(403);
                done();
            });
        });
        it('Only authenticated users allowed to see the book list', function (done) {
            chai.request(app).get('/api/users/1/books').end(function (err, res) {
                expect(res.status).to.equal(403);
                done();
            });
        });
    });

    describe('/POST ', function () {
        it('All users are allowed to register, Sign up successful', function (done) {
            chai.request(app).post('/api/users/signup').send({ username: faker.internet.userName(), password: faker.internet.password }).end(function (err, res) {
                expect(201);
                done();
            });
        });
        it('Only authenticated users allowed to create books', function (done) {
            chai.request(app).post('/api/books/').end(function (err, res) {
                expect(res.status).to.equal(403);
                done();
            });
        });
        it('Only authenticated users allowed to loan', function (done) {
            chai.request(app).post('/api/users/1/books').end(function (err, res) {
                expect(res.status).to.equal(403);
                done();
            });
        });
    });
    describe('/PUT', function () {
        it('Only authenticated users allowed to edit books', function (done) {
            chai.request(app).put('/api/books/1').end(function (err, res) {
                expect(res.status).to.equal(403);
                done();
            });
        });
        it('Only authenticated users allowed to return books', function (done) {
            chai.request(app).put('/api/users/1/books').end(function (err, res) {
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
            chai.request(app).post('api/users/signin').send({ username: faker.internet.userName(), password: faker.internet.password }).end(function (err, res) {
                expect(403);
                done();
            });
        });
        //Authenticated users
        it('it responds with 202 status code if good username or password', function (done) {
            chai.request(app).post('/api/users/signin').send({ username: "Benny", password: "benny" }).end(function (err, res) {
                expect(res.status).to.equal(200);
                done();
            });
        });
        //Authenticate the user with a token
        it('it returns succesful login if user name and password', function (done) {
            chai.request(app).post('/api/users/signin').send({ username: "Benny", password: "benny" }).end(function (err, res) {
                token = res.body.token;
                //if (err) return done(err);
                expect('Content-Type', /json/);
                expect(res.body).have.property('token');

                done();
            });
        });

        //Loan a book need to change the date
        it('it allows the user to loan a book', function (done) {
            var userbook = {
                userid: userId,
                book_id: bookid,
                date: '2016-08-09 04:05:02'
                // return_status: false
            };

            chai.request(app).post('/api/users/' + userbook.userid + '/books').set('x-access-token', token).send(userbook).end(function (err, res) {

                expect(res.status).to.equal(201);

                done();
            });
        });

        //Retrieves
        describe('/GET', function () {
            it('It retrieves all books from the data', function (done) {
                chai.request(app).get('/api/books').set('x-access-token', token).end(function (err, res) {
                    //bookid = Books.id
                    expect(res.status).to.equal(200);
                    done();
                });
            });
        });
        //Edit a book
        describe('/PUT', function () {
            it('Edit a select book from the data', function (done) {
                chai.request(app).put('/api/books/' + bookid).set('x-access-token', token).send({
                    book_title: "The Chronicles of Andela",
                    books_author: "C.S. Lewis",
                    category: "Action"
                }).end(function (err, res) {
                    expect(res.status).to.equal(200);
                    done();
                });
            });

            //return books
            it('it should return a book', function (done) {
                chai.request(app).put('/api/users/' + userId + '/books').set('x-access-token', token).send({
                    book_id: bookid,
                    userid: userId
                }).end(function (err, res) {
                    //console.log(res, '++++++++++++')
                    expect(res.status).to.equal(200);

                    done();
                });
            });
        });
    });

    // after((done) => {
    //     //     User.drop();
    //     //     Books.drop();
    //     sequelize.sync({ force: true })

    // });
});

/*

Authenticated users
*/