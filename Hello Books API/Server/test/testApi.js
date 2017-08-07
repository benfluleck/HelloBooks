const app = require('../app');
const mocha = require('mocha');
const chai = require('chai');
let chaiHttp = require('chai-http');
const db = require('../server/models')
const User = require('../server/models').User;
let Books = require('../server/models').Books;
const server = require('../server/routes/index');
const expect = chai.expect;
const assert = chai.assert;
let sequelize = require('../server/models').sequelize;
//import faker from 'faker';
//--compilers js:babel-core/register
// Questions: Classes , ES6 problems maybe babel


// after((done) => {


//     db.sequelize.sync({ force: true })
//         .then(() => {
//             console.log("I ran")
//         })
//         .catch((error) => {
//             console.log('an error occurred')
//         })
// });

//During the test the env variable is set to test
//process.env.NODE_ENV = 'test';


chai.use(chaiHttp);
//Our parent block



//Middleware for database
describe('Books', () => {
    beforeEach((done) => {
        // Books.destroy({ where: {} });
        //User.destroy({ where: {} });

        Books.create({
            book_title: "Shola comes home",
            books_author: "Benny Ogidan",
            category: "Fiction",
        }), (err) => {
            done();
        };

        // .then((book) => {
        //     res.status.send(200)
        // })
        // .catch((error) => {
        //     console.log("an error occured")
        // })
        // });

        User.create({
            username: "Benny",
            password: "benny",
            email: "ben@email.com",
        }, (err) => {
            done();
        });
        done();
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

    // describe('/PUT book', () => {
    //     it('Only authenticated users allowed to edit books', (done) => {
    //         chai.request(app)
    //             .put('/api/books/1')
    //             .end((err, res) => {
    //                 expect(res.status).to.equal(403);
    //                 done();
    //             });
    //     });
    // });

    /*
    Authenticated users
    */
    describe('POST /login', () => {
        it('it responds with 401 status code if bad username or password', (done) => {
            chai.request(app)
                .post('api/users/signin')
                .send({ username: "bad", password: "wrong" })
                .end((err, res) => {
                    expect(403);
                    done();
                });
        });

        it('it responds with 200 status code if good username or password', (done) => {
            chai.request(app)
                .post('/api/users/signin')
                .send({ username: "Benny", password: "benny" })
                .end((err, res) => {
                    expect(res.status).to.equal(200)
                    done();
                });
        });

        it('it returns JWT token if good username or password', (done) => {
            chai.request(app)
                .post('/api/users/signin')
                .send({ username: "Benny", password: "benny" })
                .end((err, res) => {
                    //if (err) return done(err);
                    expect(res.body).have.property('token');
                    //console.log(res);
                    done();
                });
        });
    });

});





/*

Authenticated users
*/



// });
// describe('/POST user signups', () => {
//     it('Users should be able to sign up ', (done) => {
//         let user = {
//             username: "Test user",
//             password: "testuser",
//             email: "test@user.com"
//         }
//         chai.request(app)
//             .post('/api/users/signup')
//             .send(user)
//             .end((err, res) => {
//                 expect(res.status).to.equal(201);
//                 expect(res.body) //res.body.should.be.a('object');
//                     //res.body.should.have.property('errors');
//                     //res.body.errors.should.have.property('pages');
//                     //    res.body.errors.pages.should.have.property('kind').eql('required');
//                 done();
//             });
//     });
//