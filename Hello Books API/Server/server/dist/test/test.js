'use strict';

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

var Books = _models2.default.Books;
// const server = require('../routes/index');