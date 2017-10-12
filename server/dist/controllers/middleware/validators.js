'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inValidFieldMessage = exports.fieldValidationFnMap = undefined;

var _validator = require('validator');

var fieldLength = {
  password: { max: 15, min: 6 },
  username: { max: 30, min: 5 },
  lastname: { max: 30, min: 2 },
  firstname: { max: 30, min: 2 }
};

var modifiedIsLength = function modifiedIsLength(field) {
  return function (val) {
    return (0, _validator.isLength)(val, fieldLength[field] || {});
  };
};

var fieldValidationFnMap = exports.fieldValidationFnMap = {
  email: [_validator.isEmail],
  password: [modifiedIsLength('password')],
  username: [modifiedIsLength('username'), _validator.isAlphanumeric],
  firstname: [modifiedIsLength('firstname')],
  lastname: [modifiedIsLength('lastname')]
};

var inValidFieldMessage = exports.inValidFieldMessage = {
  email: 'The email address you provided is not valid',
  password: 'Password is too short or too long',
  username: 'Username is invalid',
  firstname: 'Firstname is invalid',
  lastname: 'Lastname is invalid'

};