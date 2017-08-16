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
  errorArray: function errorArray(error) {
    var errorArray = [];
    error.errors.forEach(function (err) {
      errorArray.push({ path: err.path, message: err.message });
    });
    return errorArray;
  }
};

exports.default = Helper;