'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validators = require('./validators');

var fieldMap = {
  '/auth/users/signup': ['email']
};

/**
 * middleware for field format validations
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */

exports.default = function (req, res, next) {
  var path = req.path;
  var invalidField = fieldMap[path].find(function (field) {
    if (req.body[field]) {
      var validationFn = _validators.fieldValidationFnMap[field];
      return !validationFn.every(function (fn) {
        return fn(req.body[field]);
      });
    }
    return true;
  });

  if (invalidField) {
    return res.status(422).send({
      message: _validators.inValidFieldMessage[invalidField]
    });
  }
  next();
};