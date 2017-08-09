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

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Set up the express app
var app = (0, _express2.default)();

// Log requests to the console.
app.use((0, _morgan2.default)('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

(0, _routes2.default)(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.


app.get('*', function (req, res) {
    return res.status(200).send({
        message: 'This is just a test.'
    });
});

exports.default = app;