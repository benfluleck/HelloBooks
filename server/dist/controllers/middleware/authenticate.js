'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
* authenticates a the json web token  to be appended in routes that need to be authenticated
* @public
* @param {object} req - request object
* @param {object} res - response object
* @param {function} next - next function to be called on the success
* @return {undefined} if not defined send a response to the server indicating this
*/
var authenticate = function authenticate(req, res, next) {
  if (req.url.startsWith('/auth')) return next();
  var token = req.headers['x-access-token'] || req.headers.authorization;
  if (token) {
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECRET, function (error, decoded) {
      if (error) {
        return res.status(401).json({ message: 'Unauthorised access' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(403).send({ success: false, message: 'Incorrect, Please try Login again' });
  }
};

/**
 * @description Generates a json web token with the supplied parameters
 * @param {number} id user id
 * @param  {String} email email address
 * @param  {String} username username
 * @param  {String} firstname firstname
 * @return {promise} signed token
 */
var getJWT = function getJWT(id, email, username, firstname) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken2.default.sign({
      id: id,
      email: email,
      username: username,
      firstname: firstname
    }, process.env.JWT_SECRET, {
      expiresIn: '24h'
    }, function (error, token) {
      if (error) {
        reject(new Error({
          status: 'Error',
          message: error
        }));
      } else if (token) {
        resolve({
          status: 'Success',
          token: token
        });
      } else {
        reject(new Error({
          status: 'Error',
          message: 'Token error'
        }));
      }
    });
  });
};

module.exports = {
  getJWT: getJWT,
  authenticate: authenticate

};