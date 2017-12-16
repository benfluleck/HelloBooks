import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE
} from '../actiontype';
import api from '../api';

export const getNotificationSuccess = data => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  data
}
);
export const getNotificationFailure = error => ({
  type: GET_NOTIFICATIONS_FAILURE,
  error
});

/**
 * @description async helper function: get Admin Notifications
 *
 * @function getNotification
 *
 * @returns {function} asynchronous action
 */
export const getAdminNotificationAction = () => dispatch => api
  .admin
  .getAdminNotifications()
  .then((response) => {
    dispatch(getNotificationSuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(getNotificationFailure({ error }));
  });
