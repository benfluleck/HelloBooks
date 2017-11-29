import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../app';

const expect = chai.expect;

chai.use(chaiHttp);


let adminToken = '';


describe('User', () => {
  it('should return 200 when an admin user login is successful', (done) => {
    chai.request(app).post('/api/v1/auth/users/signin')
      .set('Accept', 'application/x-www-form-urlencoded')
      .send({
        username: 'bennyogidan',
        password: 'bennyogidan',
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        adminToken = res.body.token;
        done();
      });
  });
});

describe('Categories', () => {
  it(
    'should return 200 when displaying all categories',
    (done) => {
      chai.request(app).get('/api/v1/books/listcategories')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    }
  );
  it(
    'should return 200 when displaying all book categories',
    (done) => {
      chai.request(app).get('/api/v1/books/category/1')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    }
  );
  it(
    'should return 409 when dtrying to delete a category with books in it',
    (done) => {
      chai.request(app).delete('/api/v1/admin/category/1')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    }
  );
  it('should return 201 when a category is added', (done) => {
    chai.request(app).post('/api/v1/admin/category')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .send({
        categoryName: 'EDUCATIONAL'
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });

  it('should return 400 when an empty form is submitted', (done) => {
    chai.request(app).post('/api/v1/admin/category')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .send({ })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it('should return 409 when a category to be added already exists', (done) => {
    chai.request(app).post('/api/v1/admin/category')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .send({
        categoryName: 'EDUCATIONAL'
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        done();
      });
  });

  it(
    'should return 200 when displaying books by categories in the library',
    (done) => {
      chai.request(app).get('/api/v1/books/category/1')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    }
  );
  it(
    'should return 400 when categoryId to display is not valid',
    (done) => {
      chai.request(app).get('/api/v1/books/category/bbnbnnb').set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    }
  );
  it(
    'should return 404 when categoryId to display is not found',
    (done) => {
      chai.request(app).get('/api/v1/books/category/404').set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    }
  );
  it('should return 200 when a category is modified', (done) => {
    chai.request(app).put('/api/v1/admin/category/7').set('x-access-token', adminToken)
      .send({
        categoryName: 'Test Category'
      })
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('should return 400 when a category name field is null', (done) => {
    chai.request(app).put('/api/v1/admin/category/2').set('x-access-token', adminToken)
      .send({ categoryName: null })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
  it(
    'should return 400 when categoryId to modify is not valid',
    (done) => {
      chai.request(app).put('/api/v1/admin/category/nkkkj').set('x-access-token', adminToken)
        .send({
          name: 'Test Category'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    }
  );
  it(
    'should return 404 when category to modify is not found',
    (done) => {
      chai.request(app).put('/api/v1/admin/category/404').set('x-access-token', adminToken)
        .send({
          categoryName: 'Test Category'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    }
  );
  it(
    'should return 409 when category to modify to already exists',
    (done) => {
      chai.request(app).put('/api/v1/admin/category/2').set('x-access-token', adminToken)
        .send({
          categoryName: 'Test Category'
        })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          done();
        });
    }
  );
  it(
    'should return 200 when category is deleted',
    (done) => {
      chai.request(app).delete('/api/v1/admin/category/7').set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    }
  );
  it(
    'should return 404 when category to delete is not found',
    (done) => {
      chai.request(app).put('/api/v1/admin/category/7').set('x-access-token', adminToken)
        .send({
          categoryName: 'Test Category'
        })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    }
  );
  it(
    'should return 400 when categoryId to delete is not valid',
    (done) => {
      chai.request(app).delete('/api/v1/admin/category/nkkkj').set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    }
  );
});

