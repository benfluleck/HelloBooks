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
  create: function create(req, res, err) {

    return User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: req.body.password,
      password_confirmation: req.body.password_confirmation,
      email: req.body.email
    }).then(function (user) {
      if (!user) {
        res.json({ message: 'Error adding user' });
      } else {
        res.json({ success: true, name: user.firstname, username: user.username });
      }
    }).catch(function (error) {
      //if(error.message ==="Validation Error")
      error.errors.map(function (error) {
        if (error.type === "notNull Violation") {
          res.json({
            error: 'not Null',
            message: 'You have not defined one or more of your values'
          });
        }
      });
      // console.log(error.message);
      //res.status(400).send(error);
    });
  },
  signin: function signin(req, res) {
    return User.findOne({

      where: {
        username: req.body.username

      }
    }).then(function (user) {

      if (!user) {

        return res.json({ success: false, message: req.body.username + ' does not exist in the database' });

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
        res.json({ success: false, message: 'Incorrect Password Entered' });
      }
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  },
  loanbook: function loanbook(req, res) {
    return UserBooks.findOne({
      where: {
        userid: req.params.userId,
        bookid: req.body.bookid,
        return_status: false

      },
      include: [{ model: Books, as: 'book', required: true }]
    }).then(function (bookfound) {
      /**
       * Check if the book has been borrowed before,
       * User should borrow .
       */
      if (bookfound) {
        return res.status(405).send({ success: false, messsage: 'This book has already been borrowed by you', bookfound: bookfound });
      }
      return UserBooks.create({
        userid: req.params.userId,
        bookid: req.body.bookid,
        return_date: req.body.date
        // status in user table will need to be updated
        // if book id does not exist
      }).then(function () {
        Books.findOne({
          where: {
            id: req.body.bookid
          }
        }).then(function (bookfound) {
          // If book is borrowed out, then No book to borrow
          if (!bookfound || bookfound.quantity === 0) {
            return res.status(404).send({ success: false, message: 'Book not found or All copies of this book are gone' });
          }

          return bookfound.update({
            quantity: bookfound.quantity - 1
          }).then(function (updateBook) {
            res.status(200).send({ success: true, message: updateBook.title + ' succesfully loaned', updateBook: updateBook });
          }).catch(function (error) {
            res.status(400).send({ Errors: _helper2.default.errorArray(error) });
          });
        }).catch(function (error) {
          res.status(400).send({ Errors: _helper2.default.errorArray(error) });
        });
      }).catch(function () {
        res.status(400).send({ success: false, message: 'Check entered UserId or BookId and ensure its valid input' });
      });
    }).catch(function (error) {
      //console.log(error);
      res.status(400).send({ success: false, message: ' ' + error.message });
    });
  },
  getborrowerslist: function getborrowerslist(req, res) {
    return UserBooks.findAll({
      where: {
        userid: req.params.userId,
        return_status: req.query.returned
      },
      include: [{ model: Books, as: 'book', required: true }]
    }).then(function (book) {
      if (book.length === 0) {
        return res.status(404).send({ success: false, message: 'You have no books on your loan list' });
      }
      res.status(200).send({
        book: book
      });
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  },
  returnbook: function returnbook(req, res) {
    return UserBooks.findOne({
      where: {
        bookid: req.body.bookid,
        userid: req.params.userId,
        return_status: true
      },
      include: [{ model: Books, as: 'book', required: true }]
    }).then(function (book) {
      if (book) {
        return res.status(409).send({ success: false, messsage: 'You have returned this book already', book: book });
      }

      return UserBooks.update({
        return_status: true,
        user_return_date: Date.now()
      }, {
        where: {
          userid: req.params.userId,
          bookid: req.body.bookid
        }
      }).then(function () {
        Books.findOne({
          where: {
            id: req.body.bookid
          }
        }).then(function (bookfound) {
          if (!bookfound) {
            return res.status(404).send({
              message: 'Book does not exist in this database'
            });
          }
          return bookfound.update({
            quantity: bookfound.quantity + 1
          }).then(function (updatebook) {
            res.status(200).send({ success: true, message: updatebook.title + ' has been returned', updatebook: updatebook });
          }).catch(function (error) {
            return res.status(400).send(error.message);
          });
        }).catch(function (error) {
          return res.status(400).send(error.message);
        });
      });
    }).catch(function (error) {
      return res.status(400).send(error.message);
    });
  }
};