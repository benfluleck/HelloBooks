'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _models = require('../../app/models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import helper from '../helper/test.helper';

var expect = _chai2.default.expect;

describe('User ', function () {
  it('should not create a user when password character is not up to 8', function (done) {
    User.create(helper.invalidPasswordUser).then({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      username: 'Benny',
      password: '',
      password_confirmation: '',
      email: 'benny@ogidan.com'
    }).catch(function (error) {
      expect(error.errors[0].message).to.equal('Minimum of 8s characters is required');
      expect(error.errors[0].type).to.equal('Validation error');
      expect(error.errors[0].path).to.equal('validatePassword');
      done();
    });
  });
});