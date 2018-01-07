import jwt from 'jsonwebtoken';
import jwtDecode from 'jwt-decode';

/**
*
* @description authenticates a the json web token  to be
appended in routes that need to be authenticated
*
* @param {object} req - request object
*
* @param {object} res - response object
*
* @param {function} next - next function to be called on the success
*
* @return {object}
*
* @return {string} message - Validation error
*
*/
const authenticate = (req, res, next) => {
  if (req.url.startsWith('/auth')) return next();
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).json({
          message: 'Unauthorised access, Please login again'
        });
      }
      req.user = decoded;
      next();
    });
  } else if (token === '') {
    res.status(403).send({
      message: 'Forbidden'
    });
  } else {
    res.status(401).send({
      message: 'Unauthorised access, Please login again'
    });
  }
};

/**
 * @description Decode Token for the server side processes
 *
 * @param {object} req - HTTP request object
 *
 * @param {object} res - HTTP response object
 *
 * @param {undefined} next
 *
 * @returns {object} res - decodedToken
 */
const decodeToken = (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    const decodedToken = jwtDecode(token);
    req.userId = decodedToken.id.id;
    next();
  } else {
    res.status(401).send({ token: null, message: 'Unauthorised access' });
  }
};


/**
 * @description Generates a json web token with the supplied parameters
 *
 * @param {number} id
 *
 * @param {boolean} isAdmin
 *
 * @return {promise} signed token
 */
const getJWT = (id, isAdmin) =>
  new Promise((resolve, reject) => {
    jwt.sign(
      {
        id,
        isAdmin
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '4h'
      },
      (error, token) => {
        if (error) {
          reject(new Error({
            status: 'Error',
            message: 'Error generating token'
          }));
        } else if (token) {
          resolve({ status: 'Success', token });
        } else {
          reject(new Error({
            status: 'Error',
            message: 'Error generating token'
          }));
        }
      }
    );
  });

module.exports = {
  getJWT,
  authenticate,
  decodeToken
};
