import { fieldValidationFnMap, inValidFieldMessage } from '././validators';


const fieldMap = {
  '/auth/users/signup': ['email']
};

/**
 * @description middleware for field format validations
 *
 * @param {object} req - request object
 *
 * @param {object} res - respond object
 *
 * @param {function} next
 *
 * @returns {bool} validation error
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
