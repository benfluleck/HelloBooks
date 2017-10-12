import { isEmail, isLength, isAlphanumeric } from 'validator';


const fieldLength = {
  password: { max: 15, min: 6 },
  username: { max: 30, min: 5 },
  lastname: { max: 30, min: 2 },
  firstname: { max: 30, min: 2 }
};

const modifiedIsLength = field => val =>
  isLength(val, fieldLength[field] || {});

export const fieldValidationFnMap = {
  email: [isEmail],
  password: [modifiedIsLength('password')],
  username: [modifiedIsLength('username'), isAlphanumeric],
  firstname: [modifiedIsLength('firstname')],
  lastname: [modifiedIsLength('lastname')]
};

export const inValidFieldMessage = {
  email: 'The email address you provided is not valid',
  password: 'Password is too short or too long',
  username: 'Username is invalid',
  firstname: 'Firstname is invalid',
  lastname: 'Lastname is invalid',

};
