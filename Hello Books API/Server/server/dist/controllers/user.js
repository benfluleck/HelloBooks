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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;
var UserBooks = _models2.default.UserBooks;

exports.default = {
  /**
   * Create a new user
   * Route: POST: /users
   * @param {Object} req request object
   * @param {Object} res response object
   * @returns {void|Response} response object or void
   */
  create: function create(req, res) {
    // console.log(req.body, '++++++++++')
    return User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      email: req.body.email

    }).then(function (user) {
      return res.json({ success: true, name: user.firstname, username: user.username });
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  },


  // Sign In route build
  signin: function signin(req, res) {
    return User.findOne({

      where: {
        username: req.body.username

      }
    }).then(function (user) {

      if (!user) {
        // res.status(403).send();
        res.json({ success: false, message: 'Bad Authentication failed. User not found.' });
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
        res.json({ success: false, message: 'Password error.' });
      }
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  },
  loanbook: function loanbook(req, res) {

    return UserBooks.create({
      userid: req.params.userId,
      bookid: req.body.bookid,
      return_date: req.body.date
      // status in user table will need to be updated
      // if book id does not exist
    }).then(function (userbook) {
      if (userbook.return_status = false) userbook.return_status = true;
      userbook.save;
      return res.status(201).send(userbook);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  getborrowerslist: function getborrowerslist(req, res) {
    return UserBooks.findAll({ where: { userid: req.params.userId, return_status: req.query.returned } }).then(function (book) {
      return res.status(200).send(book);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  returnbook: function returnbook(req, res) {

    return UserBooks.find({
      where: {
        bookid: req.body.bookid,
        userid: req.params.userId

      }
    }).then(function (book) {
      if (!book) {
        return res.status(404).send({
          message: 'Book does not exist in this database'
        });
      }

      return book.update({
        return_status: true
      }).then(function () {
        return res.status(200).send(book);
      } // Send back the updated book
      ).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};