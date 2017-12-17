import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';
import {
  PASSWORD_CHANGED_SUCCESS,
  PASSWORD_CHANGED_FAILURE
} from './actionType';
import api from './api';

export const changePasswordSuccess = data => ({
  type: PASSWORD_CHANGED_SUCCESS, data
});
export const changePasswordRejected = error => ({
  type: PASSWORD_CHANGED_FAILURE, error
});

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
export const changePasswordAction = (password, oldPassword) => dispatch => api
  .user
  .changePassword(password, oldPassword)
  .then((response) => {
    dispatch(changePasswordSuccess(response));
    dispatch(showSuccessNotification(response.data));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(changePasswordRejected(error));
  });
