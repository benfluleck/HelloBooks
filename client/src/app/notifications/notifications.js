import {reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
const { notifSend } = notifActions;


/**
 * @description async notifications: show error notification
 * @function showErrorNotification
 * @param {object} error
 * @returns {function} asynchronous action
 */
export const showErrorNotification = ({ message, error }) => {
  return (dispatch) => {
    dispatch(notifSend({
      message: message || error.response.data.message,
      kind: 'danger',
      dismissAfter: 5000
    }));
  };
}

/**
 * async notifications: show success notification
 * @function showSuccessrNotification
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
