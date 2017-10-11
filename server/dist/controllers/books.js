'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _helper = require('../Helper/helper');

var _helper2 = _interopRequireDefault(_helper);

var _pagination = require('../controllers/middleware/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Books = _models2.default.Books;

exports.default = {

  /**
   *
   * @description creates a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   *
   * @memmberOf BookController
  */
  create: function create(req, res) {
    return Books.findOne({
      where: { title: req.body.title }

    }).then(function (book) {
      if (book !== null) {
        return res.status(400).send({ message: 'A book with the same title already exist' });
      }
      return Books.create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
        quantity: req.body.quantity,
        description: req.body.description,
        book_image: req.body.book_image
      }).then(function (books) {
        return res.status(201).send({
          Book_title: books.title,
          Author: books.author,
          Description: books.description,
          Number: books.quantity,
          Image: books.book_image
        });
      }).catch(function (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.json({ error: 'Unique Error', message: 'The book with this author is already in the database, try to add to books' });
        } else {
          res.status(401).send({
            Errors: _helper2.default.errorArray(error)
          });
        }
      }).catch(function (error) {
        return res.status(401).send(error);
      });
    });
  },


  /**
   *
   * @description update a book
   * @param {any} req
   * @param {any} res
   * @returns {any} book
   *
   * @memmberOf BookController
   *
   *
   */
  update: function update(req, res) {
    return Books.findById(req.params.bookId).then(function (book) {
      if (req.params.bookId === null) {
        return res.json({ success: false, message: 'Enter a parameter' });
      }
      if (!book) {
        return res.status(404).send({ message: 'Book does not exist in this database' });
      }
      return book.updateAttributes(req.body, {
        fields: Object.keys(req.body)
      }).then(function () {
        return res.status(201).send(book);
      }).catch(function (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          res.json({
            error: 'Unique Error',
            message: 'The book with this author is already in the database try editing the book quanti' + 'ty'
          });
        } else {
          res.status(401).send({
            Errors: _helper2.default.errorArray(error)
          });
        }
      });
    }).catch(function (error) {
      return res.status(500).send({
        Errors: _helper2.default.errorArray(error)
      });
    });
  },


  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {any} delete books
   *
   *
   */
  destroybooks: function destroybooks(req, res) {
    if (req.params.bookId === 'undefined') {
      return res.status(404).send({ success: false, message: 'Book not found' });
    }
    return Books.findById({
      where: {
        id: req.params.bookId
      }
    }).then(function (book) {
      if (!book) {
        return res.status(404).send({ success: false, message: 'Book not found' });
      }
      book.destroy();
      return res.status(200).send({ success: true, message: 'Book successfully deleted' });
    }).catch(function () {
      return res.status(400).send({ success: false, message: 'Enter valid inputs!' });
    });
  },


  /**
   *
   *
   * @param {any} req
   * @param {any} res
   * @returns {any} books
   */
  getAllBooks: function getAllBooks(req, res) {
    var offset = req.query.offset;
    var limit = req.query.limit;
    return Books.findAndCountAll({
      limit: limit,
      offset: offset
    }).then(function (books) {
      if (books.count === 0) {
        res.json({ error: 'Empty', message: 'There are no books present in the database' });
      } else {
        res.status(200).send({
          books: books.rows,
          pagination: (0, _pagination2.default)(offset, limit, books)
        });
      }
    }).catch(function (error) {
      return res.status(501).send(error.message);
    });
  }
};