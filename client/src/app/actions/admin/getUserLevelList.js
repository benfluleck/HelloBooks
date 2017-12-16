import { showErrorNotification } from '../notifications';
import {
  GET_USER_LEVEL_LIST_FAILURE,
  GET_USER_LEVEL_LIST_SUCCESS
} from '../actiontype';
import api from '../api';

export const getUserLevelListSuccess = userLevelList => (
  { type: GET_USER_LEVEL_LIST_SUCCESS, userLevelList }
);
export const getUserLevelListFailure = error =>
  ({
    type: GET_USER_LEVEL_LIST_FAILURE,
    error
  });


/**
 * async helper function: get User Lists
 * @function getUserLevelListaction
 * @returns {function} asynchronous action
 */
export const getUserLevelListAction = () => dispatch => api
  .admin
  .getUserLevelList()
  .then((response) => {
    dispatch(getUserLevelListSuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(getUserLevelListFailure({ error }));
  });
