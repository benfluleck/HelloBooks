'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Helper = {

  /**
   * Get user's profile'
   * @param {Object} data object containing user's details
   * @returns {Object} return user's data
   */
  fakeuserProfile: function fakeuserProfile() {
    return {
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: password,
      password_confirmation: password_confirmation,
      email: email
    };
  }
};

exports.default = Helper;