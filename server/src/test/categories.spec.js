import chai from 'chai';
import chaiHttp from 'chai-http';
import usrToken from './helpers/testHooks';

import app from '../app';

const expect = chai.expect;

chai.use(chaiHttp);

let adminToken = '';

describe('Categories', () => {
  before((done) => {
    usrToken().then((response) => {
      adminToken = response.adminToken;
      done();
    });
  });
  it('should return 200 when displaying all categories', (done) => {
    chai
      .request(app)
      .get('/api/v1/books/listcategories')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        expect(res.body.categories)
          .to
          .have
          .length(7);
        expect(res.body.categories)
          .to
          .be
          .an('array');
        done();
      });
  });
  it('should return 200 when displaying all book categories', (done) => {
    chai
      .request(app)
      .get('/api/v1/books/category/1')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.status)
          .to
          .equal(200);
        expect(res.body.books)
          .to
          .be
          .an('array');
        expect(res.body.books)
          .to
          .have
          .length(6);
        done();
      });
  });
  it(
    'should return 409 when trying to delete a category with books in it',
    (done) => {
      chai
        .request(app)
        .delete('/api/v1/admin/category/1')
        .set('Accept', 'application/x-www-form-urlencoded')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          expect(res.body.message)
            .to
            .equal('You cannot delete this category ' +
            'as there are still books in it');
          expect(res.status)
            .to
            .equal(409);
          done();
        });
    }
  );
  it('should return 201 when a category is added', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .send({ categoryName: 'EDUCATIONAL' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Category added!, EDUCATIONAL');
        expect(res.status)
          .to
          .equal(201);
        done();
      });
  });

  it('should return 400 when an no category name is submitted', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .send({})
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('The category name is Invalid');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it('should return 409 when a category to be added already exists', (done) => {
    chai
      .request(app)
      .post('/api/v1/admin/category')
      .set('Accept', 'application/x-www-form-urlencoded')
      .set('x-access-token', adminToken)
      .send({ categoryName: 'EDUCATIONAL' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Category already exists');
        expect(res.status)
          .to
          .equal(409);
        done();
      });
  });
  it('should return 400 when categoryId to display is not valid', (done) => {
    chai
      .request(app)
      .get('/api/v1/books/category/bbnbnnb')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Please enter a valid category');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it('should return 404 when categoryId to display is not found', (done) => {
    chai
      .request(app)
      .get('/api/v1/books/category/404')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Category does not exist in this Library');
        expect(res.status)
          .to
          .equal(404);
        done();
      });
  });
  it('should return 200 when a category is modified', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin/category/7')
      .set('x-access-token', adminToken)
      .send({ categoryName: 'TestCategory' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Category Modified!');
        expect(res.status)
          .to
          .equal(200);
        done();
      });
  });
  it('should return 400 when a category name field is null', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin/category/2')
      .set('x-access-token', adminToken)
      .send({ categoryName: null })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('The category name is Invalid');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it('should return 400 when categoryId to modify is not valid', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin/category/nkkkj')
      .set('x-access-token', adminToken)
      .send({ name: 'Test Category' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('The category name is Invalid');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
  it('should return 404 when category to modify is not found', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin/category/404')
      .set('x-access-token', adminToken)
      .send({ categoryName: 'TestCategory' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Category does not exist in this Library');
        expect(res.status)
          .to
          .equal(404);
        done();
      });
  });
  it('should return 409 when category to modify to already exists', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin/category/2')
      .set('x-access-token', adminToken)
      .send({ categoryName: 'TestCategory' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('This Category already exists');
        expect(res.status)
          .to
          .equal(409);
        done();
      });
  });
  it('should return 200 when category is deleted', (done) => {
    chai
      .request(app)
      .delete('/api/v1/admin/category/7')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('This category has been deleted');
        expect(res.status)
          .to
          .equal(200);
        done();
      });
  });
  it('should return 404 when category to delete is not found', (done) => {
    chai
      .request(app)
      .put('/api/v1/admin/category/7')
      .set('x-access-token', adminToken)
      .send({ categoryName: 'TestCategory' })
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Category does not exist in this Library');
        expect(res.status)
          .to
          .equal(404);
        done();
      });
  });
  it('should return 400 when categoryId to delete is not valid', (done) => {
    chai
      .request(app)
      .delete('/api/v1/admin/category/nkkkj')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res.body.message)
          .to
          .equal('Please enter a valid CategoryId');
        expect(res.status)
          .to
          .equal(400);
        done();
      });
  });
});
