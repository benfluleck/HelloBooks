import { showErrorNotification } from './notifications';
import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_BOOKS_FOR_CATEGORIES_SUCCESS,
  FETCH_BOOKS_FOR_CATEGORIES_FAILURE
} from './actionType';
import api from './api';

export const fetchCategoriesFailure = error =>
  ({
    type: FETCH_CATEGORIES_FAILURE,
    error
  });
export const fetchCategoriesSuccess = categories =>
  ({
    type: FETCH_CATEGORIES_SUCCESS,
    categories
  });

export const fetchBooksCategoriesFailure = error =>
  ({
    type: FETCH_BOOKS_FOR_CATEGORIES_FAILURE,
    error
  });
export const fetchBooksCategoriesSuccess = books =>
  ({
    type: FETCH_BOOKS_FOR_CATEGORIES_SUCCESS,
    books
  });


/**
 * async helper function: fetch all categories
 *
 * @function fetchAllCategories
 *
 * @returns {function} asynchronous action
 */
export const fetchAllCategories = () => dispatch => api
  .book
  .fetchAllCategories()
  .then((response) => {
    dispatch(fetchCategoriesSuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(fetchCategoriesFailure({ error }));
  });
/**
 * @description fetches all books and groups them category
 *
 * @param {number} categoryId
 *
 * @param {number} offset
 *
 * @param {number} limit
 *
 * @returns {object} asynchronous action
 */
export
const fetchBooksForCategories = (categoryId, offset, limit) => (dispatch) => {
  api
    .book
    .fetchAllBooksByCategories(categoryId, offset, limit)
    .then((response) => {
      console.log(response, 'ERRORllllllll')
      dispatch(fetchBooksCategoriesSuccess(response));
    })
    .catch((error) => {
      dispatch(showErrorNotification({ error }));
      dispatch(fetchBooksCategoriesFailure({ error }));
    });
};
