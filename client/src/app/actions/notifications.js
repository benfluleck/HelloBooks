import { actions as notifActions } from 'redux-notifications';
import setAuthorizationToken from '../utils/setAuthorizationToken';

const { notifSend } = notifActions;


/**
 * @description async notifications: show error notification
 *
 * @function showErrorNotification
 *
 * @param {object} error
 *
 * @returns {function} asynchronous action
 */
export const showErrorNotification = ({ message, error }) => (dispatch) => {
  if (error.response.data.status === 401) {
    dispatch(notifSend({
      message: 'Please Login Again',
      kind: 'info',
      dismissAfter: 3500
    }));
    localStorage.removeItem('token');
    localStorage.clear();
    setAuthorizationToken(false);
    localStorage.removeItem('http://hellobooks:state');
  } else {
    dispatch(notifSend({
      message: message || error.response.data.message || error.data.message,
      kind: 'danger',
      dismissAfter: 3500
    }));
  }
};

/**
 * async notifications: show success notification
 *
 * @function showSuccessNotification
 *
 * @param {string} message
 *
 * @param {object} response
 *
 * @returns {function} asynchronous action
 */
export const showSuccessNotification = ({ message, user }) => (dispatch) => {
  dispatch(notifSend({
    message: message || user.data.message,
    kind: 'success',
    dismissAfter: 3500
  }));
};
