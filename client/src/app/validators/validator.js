import { isAlpha, isLength } from 'validator';
import { isEmpty } from 'lodash';

const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"|"_+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const validateEmail = emailAddress => emailRegex.test(emailAddress);

const bookDetailValidator = (state) => {
  const errors = {};

  if (!isLength(state.author, 4, 30)) {
    errors.author = 'The author\'s name  should be between 4 and 30 characters.';
  }

  if (!isLength(state.title, 2, 30)) {
    errors.title = 'The book title should be between 2 and 30.';
  }

  if (!isLength(state.description, 10)) {
    errors.description = 'The book description should be between 10 and 300.';
  }

  if (isNaN(state.quantity)) {
    errors.quantity = 'The quantity should be an integer';
  } else if (state.quantity < 1) {
    errors.quantity = 'How do people borrow this book if there are no copies';
  }

  return { errors, isValid: isEmpty(errors) };
};

const validatePasswordInput = (state) => {
  const errors = {};

  if (!isLength(state.password, 5, 20)) {
    errors.password = 'Password ahould be a minimum of 5 characters and max. of 20.';
  }

  if (state.passwordConfirmation !== state.password) {
    errors.passwordConfirmation = 'Passwords do not match';
  }

  if (!isEmpty) {
    errors.oldpassword = 'Please fill this field';
  }
  return { errors, isValid: isEmpty(errors) };
};


const validateSignUpInput = (state) => {
  const errors = {};
  if (!validateEmail(state.email)) {
    errors.email = 'Email is Invalid';
  }

  if (!isLength(state.username, 5, 30)) {
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
    errors.password =
    'Password ahould be a minimum of 5 characters and max. of 20.';
  }

  if (!isLength(state.firstname, 4, 30)) {
    errors.firstname =
    'Firstname ahould be a minimum of 4 characters and max. of 30.';
  }

  if (!isLength(state.lastname, 4, 30)) {
    errors.lastname =
    'Lastname ahould be a minimum of 4 characters and max. of 30.';
  }

  if (state.passwordConfirmation !== state.password) {
    errors.passwordConfirmation = 'Passwords do not match';
  }

  return { errors, isValid: isEmpty(errors) };
};

const validateForgotPasswordEmail = (state) => {
  const errors = {};

  if (trim(state.email).length === 0) {
    errors.email = 'Email is empty';
  }

  return { isValid: isEmpty(errors) };
};

const validateCategoryInput = (state) => {
  const errors = {};
  if (!isLength(state.categoryName, 3, 35)) {
    errors.categoryName = 'Category name is too short';
  } else if (!isAlpha(state.categoryName)) {
    errors.categoryName = 'Category should be only alphabet characters';
  }
  return { errors, isValid: isEmpty(errors) };
};


export { validateSignUpInput,
  validateForgotPasswordEmail,
  bookDetailValidator,
  validateCategoryInput,
  validatePasswordInput };
