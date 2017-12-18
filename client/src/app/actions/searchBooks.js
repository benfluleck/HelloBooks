import api from './api';
import { SEARCH_BOOKS_SUCCESS } from './actionType';
import { showErrorNotification } from './notifications';

/**
 * 
 * @param {object} books 
 */
export const searchBookSuccess = books =>
  ({
    type: SEARCH_BOOKS_SUCCESS,
    books
  });

/**
 * async helper function: search Books
 *
 * @function SearchBooks
 *
 * @param {object} value
 *
 * @returns {function} asynchronous action
 */
export const searchAllBooks = value => dispatch => api
  .book
  .searchBooks(value)
  .then((response) => {
    dispatch(searchBookSuccess(response.booksFound));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });
