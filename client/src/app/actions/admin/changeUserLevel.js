import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  CHANGE_USER_LEVEL_FAILURE,
  CHANGE_USER_LEVEL_SUCCESS
} from '../actionType';
import api from '../api';

export const changeUserLevelSuccess = userLevel => (
  { type: CHANGE_USER_LEVEL_SUCCESS, userLevel }
);
export const changeUserLevelFailure = error =>
  ({
    type: CHANGE_USER_LEVEL_FAILURE,
    error
  });


/**
 * async helper function: User Level
 *
 * @function changeUserLevelAction
 *
 * @param {number} newLevelId
 *
 * @param {string} userId
 *
 * @returns {function} asynchronous action
 */
export const changeUserLevelAction = (newLevelId, userId) => dispatch => api
  .admin
  .changeUserlevel(newLevelId, userId)
  .then((response) => {
    dispatch(changeUserLevelSuccess(response));
    dispatch(showSuccessNotification(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(changeUserLevelFailure({ error }));
  });
