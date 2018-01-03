import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';

import app from '../app';

const { expect } = chai;

chai.use(chaiHttp);

let userToken = '';
const errorToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

describe('Authentication', () => {
  it('should return a 401 status code if token is not a token', (done) => {
    chai
      .request(app)
      .put('/api/v1/users/changepassword')
      .set('x-access-token', '')
      .send({ newPassword: 'bennyogidan23' })
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
  it(
    'should return a 201 status code when a regular user is created',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signup')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: 'benogidan',
          password: 'boooboo',
          passwordConfirmation: 'boooboo',
          firstname: 'Benny',
          email: faker
            .internet
            .email(),
          lastname: faker
            .name
            .lastName()
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(201);
          expect(res.body).to.be.a('object');
          done();
        });
    }
  );
  it('should return 200 when a regular user signs in', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ username: 'benogidan', password: 'boooboo' })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        expect(res.body.username).to.equal('benogidan');
        expect(res.body).to.be.a('object');
        userToken = res.body.token;
        done();
      });
  });
  it('should return a 401 stus code if token is not an admin token', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('x-access-token', userToken)
      .send({ categoryName: 'EDUCATIONAL' })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(403);
        expect(res.body.token)
          .to.equal(undefined);
        done();
      });
  });
  it('should return 401 if there is an error with token', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('x-access-token', errorToken)
      .send({ categoryName: 'EDUCATIONAL' })
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
  it('should return 201 when a regular administrator is created', (done) => {
    chai.request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'testadmin',
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
        username: 'testadmin',
        password: 'boooboo'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it(
    'should not log a user in with a wrong googleID',
    (done) => {
      const newUser = {
        googleId: '345678976543'
      };
      chai.request(app)
        .post('/api/v1/auth/users/signin')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(500);
          done();
        });
    }
  );

  it(
    'should not log a user in with a wrong googleID with user details',
    (done) => {
      const newUser = {
        googleId: '345678976543',
        username: faker
          .internet
          .userName(),
        email: faker
          .internet
          .email(),
        password: 'testpassword',
        passwordConfirmation: 'testpassword'
      };
      chai.request(app)
        .post('/api/v1/auth/users/signin')
        .send(newUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    }
  );
  it(
    'should sign up users who fill the correct ' +
    'parameters for the signup form',
    (done) => {
      const email = 'bo345@kent.ac.uk';
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
          username: 'samplename',
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
    }
  );
  it('should throw a validation error for invalid user data', (done) => {
    const email = faker
      .internet
      .email();
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
        password: 'password',
        passwordConfirmation: 'password',
        email
      })
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it('should throw a validation error for invalid user data', (done) => {
    const email = 'nenemail.com';
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
          .equal(422);
        done();
      });
  });
  it(
    'should reject authorization for users due to no token being defined',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/users/books')
        .end((err, res) => {
          expect(res.status)
            .to
            .be
            .equal(401);
          done();
        });
    }
  );
  it(
    'should respond with 404 status code if bad username or password',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({
          username: faker
            .internet
            .userName(),
          password: faker
            .internet
            .password()
        })
        .end((err, res) => {
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    }
  );
  it('should ensure all signup fields are required on sign up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: faker
          .internet
          .userName(),
        email: faker
          .internet
          .email(),
        password: 'testpassword',
        passwordConfirmation: 'testpassword'
      })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Firstname is invalid');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it('should throw a 404 error for Users that do not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ username: 'UnknownUser', password: 'error' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('UnknownUser does not exist, Make sure you are signed up');
        expect(res.status)
          .to
          .equal(404);
        done();
      });
  });
  it('should return a 400 error for an invalid password ', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ username: 'Benny', password: '' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Password is too short');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it(
    'should return a 404 error for an Invalid user',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: 'nnnnnnn' })
        .end((err, res) => {
          expect(res.body.message)
            .to
            .equal('Benny does not exist, Make sure you are signed up');
          expect(res.status)
            .to
            .equal(404);
          done();
        });
    }
  );
  it('should validate that a newly signed up user is unique', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'testuser',
        firstname: 'Benn',
        lastname: 'Nyotu',
        email: 'ben@gmail.com',
        password: 'benny',
        passwordConfirmation: 'benny'
      })
      .end((err, res) => {
        expect(res.status)
          .to
          .be
          .equal(409);
        expect(res.body.message).to.equal('This username is already in use');
        done();
      });
  });
  it('should validate that the new user\'s email as unique', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'Homer',
        firstname: 'Homer',
        lastname: 'Simpson',
        email: 'sample@email.com',
        password: 'benny',
        passwordConfirmation: 'benny'
      })
      .end((err, res) => {
        expect(res.status)
          .to
          .be
          .equal(409);
        expect(res.body.message).to.equal('This email is already in use');
        done();
      });
  });
  it('should not create a user if the password does not match', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'Homer',
        firstname: 'Homer',
        lastname: 'Simpson',
        email: 'ben@gmail.com',
        password: 'benny',
        passwordConfirmation: 'benny23'
      })
      .end((err, res) => {
        expect(res.status)
          .to
          .be
          .equal(422);
        done();
      });
  });
  it(
    'should return a successful login message ' +
    'if user name and password are valid',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'testuser', password: 'testuser' })
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.body)
            .have
            .property('message');
          expect(res.body.message)
            .to
            .equal(' You are now logged in as testuser');
          done();
        });
    }
  );
  it('should require the username field when signing up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({ username: '', password: 'benny' })
      .end((err, res) => {
        expect('Content-Type', /json/);
        expect(res.status)
          .to
          .be
          .equal(400);
        expect(res.body.message)
          .to
          .equal('Username is invalid');
        done();
      });
  });
  it(
    'should require the password field when a new user\'s signs up',
    (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/users/signin')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: 'Benny', password: '' })
        .end((err, res) => {
          expect('Content-Type', /json/);
          expect(res.status)
            .to
            .be
            .equal(400);
          expect(res.body.message)
            .to
            .equal('Password is too short');
          done();
        });
    }
  );
  it('should ensure all signup fields are defined when signing up', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/users/signup')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        usename: '', email: '', password: '', passwordConfirmation: ''
      })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('This email address you have provided is invalid');
        done();
      });
  });
});
