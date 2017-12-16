import { showErrorNotification } from '../notifications';
import {
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../actiontype';
import api from '../api';

export const getUserSuccess = user => (
  { type: GET_USER_SUCCESS, user }
);
export const getUserFailure = error => ({ type: GET_USER_FAILURE, error });


/**
 * async helper function: get User Lists
 *
 * @function getUserLists
 *
 * @param {integer} userId
 *
 * @returns {function} asynchronous action
 */
export const getSelectedUser = userId => dispatch => api
  .admin
  .getUser(userId)
  .then((response) => {
    dispatch(getUserSuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(getUserFailure({ error }));
  });
