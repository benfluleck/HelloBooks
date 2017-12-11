import { nullValidationFnMap, nullValidFieldMessage } from './validators';

const fieldMap = (bookId, categoryId) => ({
  '/auth/users/signin': ['username', 'password'],
  '/auth/users/signup': ['email', 'password', 'username', 'firstname', 'lastname'],
  '/users/changepassword': ['newPassword'],
  '/admin/category': ['categoryName'],
  '/admin/books': ['title', 'description', 'author', 'quantity', 'categoryId'],
  [`/admin/books/${bookId}`]: ['title', 'author', 'description'],
  [`/admin/category/${categoryId}`]: ['categoryName']
});

/**
 * middleware to check for null validations and other bad requests
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void} boolean
 */
export default (req, res, next) => {
  const path = req.path;
  const bookId = req.params.bookId;
  const categoryId = req.params.categoryId;
  const nullField = fieldMap(bookId, categoryId)[path]
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
