import { showErrorNotification } from './notifications';
import {
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE
} from './actiontype';
import api from './api';

export const SearchBookSuccess = books => ({ type: SEARCH_BOOKS_SUCCESS, books });
export const SearchBookFailure = error => ({ type: SEARCH_BOOKS_FAILURE, error });


/**
 * async helper function: search Books
 * @function SearchBooks
 * @param {object} value
 * @returns {function} asynchronous action
 */
export const searchAllBooks = value => dispatch => api
  .book
  .searchBooks(value)
  .then((response) => {
    dispatch(SearchBookSuccess(response.booksFound));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(SearchBookFailure({ error }));
    return error;
  });
