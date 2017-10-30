import {
  FETCH_BOOKS,
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_REJECTED,
  FETCH_BOOKS_BY_USER_ID,
  FETCH_BOOKS_FULFILLED_BY_USER_ID,
  FETCH_BOOKS_REJECTED_BY_USER_ID
} from './type';
import api from './api';

export const fetchBooks = books => ({ type: FETCH_BOOKS, books });
export const fetchBooksRejected = error => ({ type: FETCH_BOOKS_REJECTED, error });
export const fetchBooksfufilled = books => ({ type: FETCH_BOOKS_FULFILLED, books });

export const fetchBooksById = books => ({ type: FETCH_BOOKS_BY_USER_ID, books });
export const fetchBooksByIdRejected = error => ({ type: FETCH_BOOKS_REJECTED_BY_USER_ID, error });
export const fetchBooksByIdfufilled = books => ({ type: FETCH_BOOKS_FULFILLED_BY_USER_ID, books });


/**
 *
 * @param {*} offset
 * @param {*} limit
 * @return {any} response
 *
 */
export const fetchAllBooks = (offset, limit) => dispatch => api
  .book
  .fetch(offset, limit)
  .then((response) => {
    dispatch(fetchBooksfufilled(response));
    return response;
  })
  .catch((error) => {
    dispatch(fetchBooksRejected(error.response));
  });

/**
 *
 * @param {*} offset
 * @param {*} limit
 * @return {any} response
 *
 */
export const fetchBooksforDashboard = (offset, limit) => dispatch => api
  .book
  .fetchRecentbooks(offset, limit)
  .then((response) => {
    dispatch(fetchBooksfufilled(response));
    return response;
  })
  .catch((error) => {
    dispatch(fetchBooksRejected(error.response));
  });

/**
 *
 * @param {*} offset
 * @param {*} limit
 * @param {*} userid
 * @return {*} any
 */
export const fetchAllBooksbyId = (offset, limit, userid) => dispatch => api
  .book
  .fetchbyUserId(offset, limit, userid)
  .then((response) => {
    dispatch(fetchBooksByIdfufilled(response));
  })
  .catch((error) => {
    dispatch(fetchBooksByIdRejected(error.response));
  });
