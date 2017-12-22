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
 * @param {string} password
 *
 * @param {string} oldPassword
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
