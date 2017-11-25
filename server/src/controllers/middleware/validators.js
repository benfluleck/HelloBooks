import { isLength, isAlpha, isNumeric } from 'validator';

const fieldLength = {
  password: { max: 21, min: 5 },
  username: { max: 30, min: 5 },
  lastname: { max: 30, min: 2 },
  firstname: { max: 30, min: 2 },
  title: { max: 60, min: 2 },
  author: { max: 60, min: 2 },
  description: { min: 7 },
  email: { max: 50, min: 5 }
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"|"_+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = emailAddress => emailRegex.test(emailAddress);

const modifiedIsLength = field => val => isLength(val, fieldLength[field] || {});

export const fieldValidationFnMap = {
  email: [validateEmail]
};

export const inValidFieldMessage = {
  email: 'This email address you have provided is invalid'
};

export const nullValidationFnMap = {
  email: [modifiedIsLength('email')],
  password: [modifiedIsLength('password')],
  username: [modifiedIsLength('username')],
  firstname: [modifiedIsLength('firstname'), isAlpha],
  lastname: [modifiedIsLength('lastname'), isAlpha],
  title: [modifiedIsLength('title')],
  description: [modifiedIsLength('description')],
  author: [modifiedIsLength('author')],
  categoryId: [isNumeric],
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
  author: "This author's name is invalid",
  categoryId: 'Category is Invalid',
  bookId: 'This book format is wrong'
};
