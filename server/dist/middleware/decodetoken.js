'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var jwt = require('jsonwebtoken');

exports.default = decodeJWT = function decodeJWT(encodedToken) {
  var decodedToken = jwt.decode(encodedToken);

  if (decodedToken) {
    return decodedToken;
  }
  return 'unauthenticated';
};