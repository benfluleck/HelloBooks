'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _helper = require('../Helper/helper');

var _helper2 = _interopRequireDefault(_helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;
var UserBooks = _models2.default.UserBooks;
var Books = _models2.default.Books;

exports.default = {
  /**
   * Create a new user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  create: function create(req, res) {
    User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      email: req.body.email
    }).then(function (user) {
      if (!user) {
        //console.log("Couldn't add user")
        res.status(400).send({ message: 'Error adding user' });
      } else {
        res.json({ success: true, name: user.firstname, username: user.username });
      }
    }).catch(function (error) {
      res.status(400).send({ success: false, message: ' ' + error.message });
    });
  },
  signin: function signin(req, res) {
    return User.findOne({

      where: {
        username: req.body.username

      }
    }).then(function (user) {

      if (!user) {

        return res.status(400).send({ success: false, message: req.body.username + ' does not exist in the database' });

        // res.status(403).send();
      } else if (_bcryptNodejs2.default.compareSync(req.body.password, user.password)) {
        var Userjwt = { name: user.username, password: user.password };
        var token = _jsonwebtoken2.default.sign(Userjwt, 'superSecret', {
          expiresIn: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token, You are now logged in!',
          token: token
        });
      } else {
        res.status(400).send({ success: false, message: 'Incorrect Password Entered' });
      }
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  }
};