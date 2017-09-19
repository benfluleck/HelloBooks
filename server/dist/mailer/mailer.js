"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResetPasswordEmail = sendResetPasswordEmail;

var _nodemailer = require("nodemailer");

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sendResetPasswordEmail(user) {
  var tranport = setup();
  var email = {
    from: from,
    to: user.email,
    subject: "Reset Password",
    text: "\n    To reset password follow this link\n    " + user.generateResetPasswordLink() + "\n    "
  };

  tranport.sendMail(email);
}