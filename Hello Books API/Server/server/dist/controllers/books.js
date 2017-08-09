'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Books = _models2.default.Books;

exports.default = {
  create: function create(req, res) {
    if (_user2.default === null) {
      return res.json({ success: false, message: 'You need to be logged in.' });
    }
    return Books.create({
      book_title: req.body.book_title,
      books_author: req.body.books_author,
      category: req.body.category
    }).then(function (books) {
      return res.status(201).send(books);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },

  // .updateAttributes(req.body, { fields: Object.keys(req.body) })
  update: function update(req, res) {
    return Books.findById(req.params.bookId).then(function (book) {
      if (!book) {
        return res.status(404).send({
          message: 'Book does not exist in this database'
        });
      }
      return book.updateAttributes(req.body, { fields: Object.keys(req.body) }).then(function () {
        return res.status(200).send(book);
      } // Send back the updated book
      ).catch(function (error) {
        return res.status(400).send(error);
      });
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  getAllBooks: function getAllBooks(req, res) {
    return Books.all().then(function (book) {
      return res.status(200).send(book);
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  }
};