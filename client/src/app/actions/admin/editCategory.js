import {
  showErrorNotification,
} from '../notifications';
import {
  EDIT_CATEGORY_FAILURE,
  EDIT_CATEGORY_SUCCESS
} from '../actionType';
import api from '../api';

export const editCategorySuccess = category =>
  ({
    type: EDIT_CATEGORY_SUCCESS,
    category
  });
export const editCategoryFailure = error =>
  ({
    type: EDIT_CATEGORY_FAILURE,
    error
  });


/**
 * async helper function: add Book to the database
 *
 * @function editNewCategory
 *
 * @param {string} categoryName
 *
 * @param {number} categoryId
 *
 * @returns {function} asynchronous action
 */
export const editCategoryAction = (categoryName, categoryId) => dispatch =>
  api
    .admin
    .editCategory(categoryName, categoryId)
    .then((response) => {
      dispatch(editCategorySuccess(response));
      return (response);
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });

