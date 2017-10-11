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

var _mailer = require('../mailer/mailer');

var _mailer2 = _interopRequireDefault(_mailer);

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
  * @returns {void|Response} status, send
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
        res.status(404).send({ message: 'Error adding user' });
      } else {
        res.json({ success: true, name: user.firstname, username: user.username });
      }
    }).catch(function (error) {
      res.status(400).send({ success: false, message: ' ' + error.message });
    });
  },


  /**
   *
   *
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} status, send
   *
   */
  signin: function signin(req, res) {
    return User.findOne({
      where: {
        username: req.body.username
      }
    }).then(function (user) {
      if (!user) {
        return res.status(404).send({ success: false, message: req.body.username + ' does not exist in the database' });
      } else if (_bcryptNodejs2.default.compareSync(req.body.password, user.password)) {
        var Userjwt = {
          id: user.id,
          name: user.username,
          password: user.password
        };
        var token = _jsonwebtoken2.default.sign(Userjwt, process.env.JWT_SECRET, {
          expiresIn: 1440
        });

        res.json({
          success: true, message: 'Welcome, ' + req.body.username + ' You are now logged in!', token: token, username: req.body.username
        });
      } else {
        res.status(400).send({ success: false, message: 'Wrong Credentials' });
      }
    }).catch(function (error) {
      return res.status(500).send(error.message);
    });
  },


  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {any} reset password
   *
   *
   *
   */
  reset_password: function reset_password(req, res) {
    User.findOne({ email: req.body.email }).then(function (user) {
      if (user) {
        (0, _mailer2.default)(user);
        res.json({});
      } else {
        res.status(400).json({
          errors: {
            global: 'There are no users with such email'
          }
        });
      }
    });
  },


  /**
   * Edit user Information
   * @public
   * @method
   * @param  {object} req - express http request object
   * @param  {object} res - express http response object
   * @return {mixed}      - sends an http response
   */
  updateUserInfo: function updateUserInfo(req, res) {
    User.findById(req.params.userId).then(function (user) {
      user.update(req.body, { returning: true, plain: true }).then(function () {
        return res.status(202).send({
          success: true,
          user: user,
          message: 'Your information was successfully updated'
        });
      }, function (error) {
        res.status(500).send({
          success: false,
          error: error
        });
      });
    }).catch(function (error) {
      return res.status(500).send({
        success: false,
        error: error
      });
    });
  }
};