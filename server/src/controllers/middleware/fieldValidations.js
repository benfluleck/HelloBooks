import { fieldValidationFnMap, inValidFieldMessage } from './validators';

const fieldMap = {
  '/auth/users/signin': ['username', 'password'],
  '/auth/users/signup': ['email', 'password', 'username', 'firstname', 'lastname']
};

/**
 * middleware for validation
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {void}
 */
export default (req, res, next) => {
  const path = req.path;
  const invalidField = fieldMap[path]
    .find((field) => {
      if (req.body[field]) {
        const validationFn = fieldValidationFnMap[field];
        return !validationFn.every(fn => fn(req.body[field]));
      }
      return true;
    });

  if (invalidField) {
    return res.status(422).send({
      message: inValidFieldMessage[invalidField]
    });
  }
  next();
};
