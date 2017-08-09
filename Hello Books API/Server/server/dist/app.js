'use strict';

var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Set up the express app
var app = express();

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./routes')(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.


app.get('*', function (req, res) {
    return res.status(200).send({
        message: 'This is just a test.'
    });
});

module.exports = app;