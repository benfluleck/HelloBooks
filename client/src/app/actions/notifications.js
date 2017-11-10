import {reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
const { notifSend } = notifActions;
// import { push } from 'react-router-redux'
import {Redirect, browserHistory} from 'react-router';
import {React} from 'react';

/**
 * @description async notifications: show error notification
 * @function showErrorNotification
 * @param {object} error
 * @returns {function} asynchronous action
 */
export const showErrorNotification = ({ message, error }) => {
  return (dispatch) => {
if (error.response.data.message === "Unauthorised access"){
  dispatch(notifSend({
    message: "Please Login Again",
    kind: 'info',
    dismissAfter: 5000
  }));
  localStorage.removeItem('state');
  localStorage.removeItem('token');
  setAuthorizationToken(false);


}
else{
    dispatch(notifSend({
      message: message || error.response.data.message,
      kind: 'danger',
      dismissAfter: 5000
    }));
  };
}
}

/**
 * async notifications: show success notification
 * @function showSuccessNotification
 * @param {string} message
 * @param {object} response
 * @returns {function} asynchronous action
 */
export const showSuccessNotification =({ message, user })=> {
  return (dispatch) => {
    dispatch(notifSend({
      message: message || user.data.message,
      kind: 'success',
      dismissAfter: 5000
    }));
  };
}
