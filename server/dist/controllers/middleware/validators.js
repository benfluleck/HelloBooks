'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nullValidFieldMessage = exports.nullValidationFnMap = exports.inValidFieldMessage = exports.fieldValidationFnMap = undefined;

var _validator = require('validator');

var fieldLength = {
  password: { max: 15, min: 6 },
  username: { max: 30, min: 5 },
  lastname: { max: 30, min: 2 },
  firstname: { max: 30, min: 2 },
  title: { max: 60, min: 2 },
  author: { max: 60, min: 2 },
  description: { max: 200, min: 7 },
  category: { max: 20, min: 5 },
  email: { max: 20, min: 5 }
};

var modifiedIsLength = function modifiedIsLength(field) {
  return function (val) {
    return (0, _validator.isLength)(val, fieldLength[field] || {});
  };
};

var fieldValidationFnMap = exports.fieldValidationFnMap = {
  email: [_validator.isEmail]
};

var inValidFieldMessage = exports.inValidFieldMessage = {
  email: 'The email address you have provided is invalid'

};

var nullValidationFnMap = exports.nullValidationFnMap = {
  email: [modifiedIsLength('email')],
  password: [modifiedIsLength('password')],
  username: [modifiedIsLength('username'), _validator.isAlphanumeric],
  firstname: [modifiedIsLength('firstname'), _validator.isAlpha],
  lastname: [modifiedIsLength('lastname'), _validator.isAlpha],
  title: [modifiedIsLength('title')],
  description: [modifiedIsLength('description')],
  author: [modifiedIsLength('author'), _validator.isAlpha],
  category: [modifiedIsLength('category'), _validator.isAlpha]
};

var nullValidFieldMessage = exports.nullValidFieldMessage = {
  email: 'The email address you provided is invalid',
  password: 'Password is too short',
  username: 'Username is invalid',
  firstname: 'Firstname is invalid',
  lastname: 'Lastname is invalid',
  title: 'This book title is too short',
  description: 'More explanatory description needed',
  author: 'This author\'s name is too short',
  category: 'Category is Invalid'
};