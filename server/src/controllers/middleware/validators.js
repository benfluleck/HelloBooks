import { isEmail, isLength, isAlphanumeric, isAlpha, isNumeric } from 'validator';




const fieldLength = {
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

const modifiedIsLength = field => val =>
  isLength(val, fieldLength[field] || {});

export const fieldValidationFnMap = {
  email: [isEmail]
};

export const inValidFieldMessage = {
  email: 'The email address you have provided is invalid'

};

export const nullValidationFnMap = {
  email: [modifiedIsLength('email')],
  password: [modifiedIsLength('password')],
  username: [modifiedIsLength('username'), isAlphanumeric],
  firstname: [modifiedIsLength('firstname'), isAlpha],
  lastname: [modifiedIsLength('lastname'), isAlpha],
  title: [modifiedIsLength('title')],
  description: [modifiedIsLength('description')],
  author: [modifiedIsLength('author'), isAlpha],
  category: [modifiedIsLength('category'), isAlpha],
  bookId: [isNumeric]

};

export const nullValidFieldMessage = {
  email: 'The email address you provided is invalid',
  password: 'Password is too short',
  username: 'Username is invalid',
  firstname: 'Firstname is invalid',
  lastname: 'Lastname is invalid',
  title: 'This book title is too short',
  description: 'More explanatory description needed',
  author: 'This author\'s name is too short',
  category: 'Category is Invalid',
  bookId: 'This book does not exist in the library'
};
