import { nullValidationFnMap, nullValidFieldMessage } from './validators';

const fieldMap = (bookId, userId) => ({
  '/auth/users/signin': ['username', 'password'],
  '/auth/users/signup': ['email', 'password', 'username', 'firstname', 'lastname'],
  '/books': ['title', 'description', 'author', 'category'],
  [`/books/${bookId}`]: ['title', 'category', 'author', 'description'],
  [`/users/${userId}/books`]: ['bookId']

});

/**
 * middleware to check for null validations and other bad requests
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
export default (req, res, next) => {
  const path = req.path;
  const bookId = req.params.bookId;
  const userId = req.params.userId;
  const nullField = fieldMap(bookId, userId)[path]
    .find((field) => {
      if (req.body[field]) {
        const validationFn = nullValidationFnMap[field];
        return !validationFn.every(fn => fn(req.body[field]));
      }
      return true;
    });

  if (nullField) {
    return res.status(400).send({
      message: nullValidFieldMessage[nullField]
    });
  }
  next();
};
