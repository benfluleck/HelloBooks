import { showErrorNotification } from './notifications';
import {
  FETCH_ALL_RECENT_BOOKS,
  FETCH_ALL_BOOKS,
  FETCH_BOOKS_REJECTED,
  FETCH_BOOKS_BY_USER_ID,
  FETCHING_BOOKS
} from './actiontype';
import api from './api';


export const fetchBooksRejected = error => ({ type: FETCH_BOOKS_REJECTED, error });
export const fetchRecentBooks = books => ({ type: FETCH_ALL_RECENT_BOOKS, books });
export const fetchBooks = books => ({ type: FETCH_ALL_BOOKS, books });
export const fetchBooksByUserId = books => ({ type: FETCH_BOOKS_BY_USER_ID, books });

export const fetchingBooks = state => ({
  type: FETCHING_BOOKS,
  state,
});

/**
 * async helper function: log in user
 * @function fetchAllBooks
 * @param {integer} offset
 * @param {integer} limit
 * @returns {function} asynchronous action
 */
export const fetchAllBooks = (offset, limit) => dispatch => api
  .book
  .fetch(offset, limit)
  .then((response) => {
    dispatch(fetchBooks(response));
    dispatch(fetchingBooks(false));
    return response;
  })
  .catch((error) => {
    dispatch(fetchBooksRejected ({ error }));
    dispatch(fetchingBooks(false));
  });

/**
 * async helper function: fetch books to go on the dashboard
 * @function fetchBooksforDashboard
 * @param {integer} offset
 * @param {integer} limit
 * @returns {function} asynchronous action
 */
export const fetchBooksforDashboard = (offset, limit) => dispatch =>
api
  .book
  .fetchRecentBooks(offset, limit)
  .then((response) => {
    dispatch(fetchRecentBooks(response));
    dispatch(fetchingBooks(false));
    return response;
  })
  .catch((error) => {
    dispatch(fetchBooksRejected ({ error }));
    dispatch(fetchingBooks(false));
  });

/**
 * async helper function:fetch books by Id
 * @function fetchAllBooksbyId
 * @param {object} offset
 * @param {object} limit
 * @returns {function} asynchronous action
 */
export const fetchAllBooksbyId = (offset, limit) => dispatch => api
  .book
  .fetchbooksbyUserId(offset, limit)
  .then((response) => {
    dispatch(fetchBooksByUserId(response));
  })
  .catch((error) => {
    dispatch(fetchBooksRejected({ error }));
  });
