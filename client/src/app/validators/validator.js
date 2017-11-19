import { isAlpha, isLength } from 'validator';
import { isEmpty } from 'lodash';


const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"|"_+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = emailAddress =>
  emailRegex.test(emailAddress);


const validateSignupInput = (state) => {
  const errors = {};

  if (!validateEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  if (!isLength(state.username, 5, 20)) {
    errors.username = 'Username should be between 5 and 20 characters.';
  } else if (state.username.charAt(0) === ' ') {
    errors.username = 'Username cannot begin with space characters';
  }

  if (!isAlpha(state.firstname)) {
    errors.firstname = 'Firstname should consist of only alphabets';
  }

  if (!isAlpha(state.lastname)) {
    errors.lastname = 'Lastname should consist of only alphabets';
  }

  if (!isLength(state.password, 5, 20)) {
    errors.password = 'Password ahould be a minimum of 5 characters and max. of 20.';
  }

  if (!isLength(state.firstname, 4, 30)) {
    errors.firstname = 'Firstname ahould be a minimum of 4 characters and max. of 30.';
  }

  if (!isLength(state.lastname, 4, 30)) {
    errors.lastname = 'Lastname ahould be a minimum of 4 characters and max. of 30.';
  }


  if (state.passwordConfirmation !== state.password) {
    errors.passwordConfirmation = 'Passwords do not match';
  }

  return {
    errors,
    isValid: isEmpty(errors)

  };
};


const validateForgotPasswordEmail = (state) => {
  const errors = {};

  if (trim(state.email).length === 0) {
    errors.email = 'Email is empty';
  }

  return {
    isValid: isEmpty(errors)
  };
};


export {
  validateSignupInput,
  validateForgotPasswordEmail
};
