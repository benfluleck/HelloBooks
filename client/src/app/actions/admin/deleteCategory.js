import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  DELETE_CATEGORY_SUCCESS,
} from '../actionType';
import api from '../api';

export const deleteCategorySuccess = deletedCategory => (
  { type: DELETE_CATEGORY_SUCCESS, deletedCategory }
);


/**
 * async helper function: delete Category
 *
 * @function deleteCategory
 *
 * @param {number} categoryId
 *
 * @returns {function} asynchronous action
 */
export const deleteCategoryAction = categoryId => dispatch => api
  .admin
  .deleteCategory(categoryId)
  .then((response) => {
    dispatch(deleteCategorySuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    return ({ error });
  });
