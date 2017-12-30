import { validateSignUpInput,
  bookDetailValidator,
  validateCategoryInput,
  validatePasswordInput }
  from '../../../src/app/validators/validator';

describe('validateSignUpInput', () => {
  const state = {
    email: 'smh@to',
    password: 'asdf',
    passwordConfirmation: 'asdnjhjgh',
    username: ' sedfdfd',
    firstname: 'Dennis',
    lastname: 'Tomiman'
  };
  it('it validates user email', () => {
    expect(validateSignUpInput(state).errors.email).toBe('Email is Invalid');
  });

  it('checks if username provided has spaces', () => {
    expect(validateSignUpInput(state).errors.username)
      .toBe('Username cannot begin with space characters');
  });
});

describe('bookDetailValidator', () => {
  const book1 = {
    author: 'Ed',
    title: '',
    description: 'erer',
    quantity: 'hhh'
  };
  it('it validates user email', () => {
    expect(bookDetailValidator(book1)
      .errors.author)
      .toBe('The author\'s name  should be between 4 and 30 characters.');
  });

  it('checks if the Title length is', () => {
    expect(bookDetailValidator(book1).errors.title)
      .toBe('The book title should be between 2 and 30.');
  });

  it('checks if the quantity is a number', () => {
    expect(bookDetailValidator(book1).errors.quantity)
      .toBe('The quantity should be an integer');
  });

  it('checks if the quantity is a number', () => {
    const book2 = {
      author: 'Ed',
      title: '',
      description: 'erer',
      quantity: '0'
    };
    expect(bookDetailValidator(book2).errors.quantity)
      .toBe('How do people borrow this book if there are no copies');
  });
});

describe('validatePasswordInput', () => {
  const passwordGroup1 = {
    oldpassword: '',
    password: 'asdf',
    passwordConfirmation: 'asdnjhjgh',
  };
  it('it validates whether password matches', () => {
    expect(validatePasswordInput(passwordGroup1).errors.passwordConfirmation)
      .toBe('Passwords do not match');
  });

  it('it validates whether password is too short', () => {
    expect(validatePasswordInput(passwordGroup1).errors.password)
      .toBe('Password ahould be a minimum of 5 characters and max. of 20.');
  });


  it('checks if the old password field is empty', () => {
    expect(validatePasswordInput(passwordGroup1).errors.oldpassword)
      .toBe('Please fill this field');
  });
});


describe('validateCategoryInput', () => {
  it('it validates user email', () => {
    const state = { categoryName: 'v' };
    expect(validateCategoryInput(state).errors.categoryName)
      .toBe('Category name is too short');
  });

  it('checks if username provided has spaces', () => {
    const state = { categoryName: '7777' };
    expect(validateCategoryInput(state).errors.categoryName)
      .toBe('Category should be only alphabet characters');
  });
});
