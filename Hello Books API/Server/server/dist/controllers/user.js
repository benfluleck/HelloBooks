'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.User;
var UserBooks = _models2.default.UserBooks;

exports.default = {
  create: function create(req, res) {
    return User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }).then(function (user) {
      return res.status(201).send(user);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
    /* User.create = (err) => {
                    if (err) throw err;
                      console.log('User saved successfully');
                }; */
  },


  // Sign In route build
  signin: function signin(req, res) {
    return User.findOne({
      where: {
        username: req.body.username,
        password: req.body.password
      }
    }).then(function (user) {
      if (!user) {
        // res.status(403).send();
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password !== req.body.password) {
          // res.status(403).send();
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          var Userjwt = { name: User.username, password: User.password };
          var token = _jsonwebtoken2.default.sign(Userjwt, 'superSecret', {
            expiresIn: 1440 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            message: 'Enjoy your token, You are now logged in!',
            token: token
          });
        }
      }
    });
  },
  loanbook: function loanbook(req, res) {
    return UserBooks.create({
      userid: req.params.userId,
      bookid: req.body.book_id,
      return_date: req.body.date,
      return_status: false
      // status in user table will need to be updated
      // if book id does not exist
    }).then(function (user) {
      return res.status(201).send(user);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  getborrowerslist: function getborrowerslist(req, res) {
    return UserBooks.findAll({ where: { userid: req.params.userId } }).then(function (book) {
      return res.status(201).send(book);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  returnbook: function returnbook(req, res) {
    return UserBooks.find({
      where: {
        bookid: req.body.book_id,
        userid: req.params.userId
        // return_status: req.query.isreturnbool
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