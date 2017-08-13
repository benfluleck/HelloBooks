"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Helper = {

  /**
   * Get user's profile'
   * @param {Object} data object containing user's details
   * @returns {Object} return user's data
   */
  userProfile: function userProfile() {
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