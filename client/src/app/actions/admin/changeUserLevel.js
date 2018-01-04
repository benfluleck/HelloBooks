import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  CHANGE_USER_LEVEL_SUCCESS
} from '../actionType';
import api from '../api';

export const changeUserLevelSuccess = userLevel => (
  { type: CHANGE_USER_LEVEL_SUCCESS, userLevel }
);


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
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });
