'use strict';

var _test = require('./test');

var _test2 = _interopRequireDefault(_test);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --compilers js:babel-core/register
// Questions: Classes , ES6 problems maybe babel

// const User = require('../models').User;
// let Books = require('../models').Books;
// During the test the env variable is set to test
// process.env.NODE_ENV = 'test';
var chai = _test2.default.chai;
var chaiHttp = _test2.default.chaiHttp;
var faker = _test2.default.faker;
var expect = chai.expect;
var Books = _test2.default.Books;
var User = _test2.default.User;