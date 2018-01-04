import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  EDIT_CATEGORY_SUCCESS
} from '../actionType';
import api from '../api';


/**
 * @description This implements action type
 * when edit category is successful
 *
 * @param {object} category
 *
 * @returns {void}
 */
export const editCategorySuccess = category =>
  ({
    type: EDIT_CATEGORY_SUCCESS,
    category
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
      dispatch(showSuccessNotification(response));
      return (response);
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
    });

