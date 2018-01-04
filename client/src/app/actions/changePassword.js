import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';

import api from './api';


/**
 * async helper function: Change password
 *
 * @function changePassword
 *
 * @param {string} password - new password specified by user
 *
 * @param {string} oldPassword - oldPassword of the user
 *
 * @returns {function} asynchronous action
 */
const changePasswordAction = (password, oldPassword) => dispatch => api
  .user
  .changePassword(password, oldPassword)
  .then((response) => {
    dispatch(showSuccessNotification(response.data));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });

export default changePasswordAction;
