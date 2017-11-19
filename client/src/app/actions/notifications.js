import { reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';

const { notifSend } = notifActions;
import { Redirect, browserHistory } from 'react-router';
import { React } from 'react';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import logout from '../actions/authenticate';

/**
 * @description async notifications: show error notification
 * @function showErrorNotification
 * @param {object} error
 * @returns {function} asynchronous action
 */
export const showErrorNotification = ({ message, error }) => (dispatch) => {
  if (error.response.data.message === 'Unauthorised access' && error.response.data.token === null) {
    dispatch(notifSend({
      message: 'Please Login Again',
      kind: 'info',
      dismissAfter: 2500
    }));
    localStorage.removeItem('state');
    localStorage.removeItem('token');
    setAuthorizationToken(false);
  } else {
    dispatch(notifSend({
      message: message || error.response.data.message,
      kind: 'danger',
      dismissAfter: 2500
    }));
  }
};

/**
 * async notifications: show success notification
 * @function showSuccessNotification
 * @param {string} message
 * @param {object} response
 * @returns {function} asynchronous action
 */
export const showSuccessNotification = ({ message, user }) => (dispatch) => {
  dispatch(notifSend({
    message: message || user.data.message || data.message,
    kind: 'success',
    dismissAfter: 2500
  }));
};
