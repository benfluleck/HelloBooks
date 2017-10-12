'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _swaggerJsdoc = require('swagger-jsdoc');

var _swaggerJsdoc2 = _interopRequireDefault(_swaggerJsdoc);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _authenticate = require('./controllers/middleware/authenticate');

var _authenticate2 = _interopRequireDefault(_authenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
var app = (0, _express2.default)();
var swaggerDefinition = {
  info: {
    title: 'Hello Books API - Benny Ogidan',
    version: '1.0.0',
    description: 'API for a Library database with Swagger'
  },
  host: 'localhost:5000',
  basePath: '/api/v1'
};

var authenticateRoutes = _authenticate2.default.authenticate;

var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./server/dist/routes/*.js']
};

var swaggerSpec = (0, _swaggerJsdoc2.default)(options);

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, x-ac' + 'cess-token');
  next();
});

app.use(_express2.default.static(_path2.default.join(__dirname, '../api-docs/')));
console.log(_path2.default.join(__dirname, '../api-docs/'));

app.get('/hellobooks.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

app.use('/api/v1', _routes2.default, authenticateRoutes);

app.get('*', function (req, res) {
  return res.status(404).send({ message: 'You are at a wrong point.' });
});

exports.default = app;