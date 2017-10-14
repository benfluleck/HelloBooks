'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validators = require('./validators');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fieldMap = function fieldMap(bookId) {
  return _defineProperty({
    '/auth/users/signin': ['username', 'password'],
    '/auth/users/signup': ['email', 'password', 'username', 'firstname', 'lastname'],
    '/books': ['title', 'description', 'author', 'category']
  }, '/books/' + bookId, ['title', 'category', 'author', 'description']);
};

/**
 * middleware to check for null validations and other bad requests
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */

exports.default = function (req, res, next) {
  var path = req.path;
  var bookId = req.params.bookId;
  var nullField = fieldMap(bookId)[path].find(function (field) {
    if (req.body[field]) {
      var validationFn = _validators.nullValidationFnMap[field];
      return !validationFn.every(function (fn) {
        return fn(req.body[field]);
      });
    }
    return true;
  });

  if (nullField) {
    return res.status(400).send({
      message: _validators.nullValidFieldMessage[nullField]
    });
  }
  next();
};