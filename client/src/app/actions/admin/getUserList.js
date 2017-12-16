import { showErrorNotification } from '../notifications';
import {
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_SUCCESS
} from '../actiontype';
import api from '../api';

export const getUserListSuccess = userList => (
  {
    type: GET_USER_LIST_SUCCESS,
    userList
  }
);
export const getUserListFailure = error =>
  ({
    type: GET_USER_LIST_FAILURE,
    error
  });


/**
 * async helper function: get User Lists
 *
 * @function getUserLists
 *
 * @param {integer} offset
 *
 * @param {integer} limit
 *
 * @returns {function} asynchronous action
 */
export const getUserListAction = (offset, limit) => dispatch => api
  .admin
  .getUserList(offset, limit)
  .then((response) => {
    dispatch(getUserListSuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(getUserListFailure({ error }));
  });
