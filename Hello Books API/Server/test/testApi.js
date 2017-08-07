const app = require('../app');
const mocha = require('mocha');
const chai = require('chai');
let chaiHttp = require('chai-http');
const User = require('../server/models').User;
let Books = require('../server/models').Books;
const server = require('../server/routes/index');
const expect = chai.expect;
const assert = chai.assert;
//import faker from 'faker';


//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
//Our parent block

describe('Books', () => {
    beforeEach((done) => {
        Books.destroy({ where: {} }, (err) => {
            done();
        });
    });
    Books.create({
        book_title: "Benny comes home",
        books_author: "Benny Ogidan",
        category: "Fiction",
    }, (err) => {
        done();
    });
});

/*
 *Unauthenticated user tests
 */
describe('/GET book', () => {
    it('Only authenticated users allowed to view books', (done) => {
        chai.request(app)
            .get('/api/books/')
            .end((err, res) => {
                expect(res.status).to.equal(403);
                done();
            });
    });
});

describe('/POST book', () => {
    it('Only authenticated users allowed to view books', (done) => {
        chai.request(app)
            .post('/api/books/')
            .end((err, res) => {
                expect(res.status).to.equal(403);
                done();
            });
    });
});

describe('/PUT book', () => {
    it('Only authenticated users allowed to edit books', (done) => {
        chai.request(app)
            .put('/api/books/1')
            .end((err, res) => {
                expect(res.status).to.equal(403);
                done();
            });
    });
});




/* describe('/POST user signups', () => {
    it('Users should be able to sign up ', (done) => {
        let user = {
            username: "Test user",
            password: "testuser",
            email: "test@user.com"
        }
        chai.request(app)
            .post('/api/users/signup')
            .send(user)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body) //res.body.should.be.a('object');
                    //res.body.should.have.property('errors');
                    //res.body.errors.should.have.property('pages');
                    //res.body.errors.pages.should.have.property('kind').eql('required');
                done();
            });
    });

}); */