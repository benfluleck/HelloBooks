import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  ADD_CATEGORY_FAILURE,
  ADD_CATEGORY_SUCCESS
} from '../actionType';
import api from '../api';

export const addCategorySuccess = category =>
  ({
    type: ADD_CATEGORY_SUCCESS, category
  });
export const addCategoryFailure = error =>
  ({
    type: ADD_CATEGORY_FAILURE, error
  });


/**
 * @description async helper function: add Category to the database
 *
 * @function addNewCategory
 *
 * @param {string} category
 *
 * @returns {function} asynchronous action
 */
export const addNewCategory = category => dispatch => api
  .admin
  .addCategory(category)
  .then((response) => {
    dispatch(addCategorySuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(addCategoryFailure({ error }));
    dispatch(showErrorNotification({ error }));
    return ({ error });
  });
