import {reducer as notifReducer, actions as notifActions, Notifs } from 'redux-notifications';
const { notifSend } = notifActions;


/**
 * @description async helper function: show error notification
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
