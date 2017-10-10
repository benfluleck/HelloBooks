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
 * fetch books in thhe Library
 * @return {any} dispatches an action
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

export const fetchAllBooksbyId = (offset, limit, userid) => dispatch => api
  .book
  .fetchbyUserId(offset, limit, userid)
  .then((response) => {
    dispatch(fetchBooksByIdfufilled(response));
  })
  .catch((error) => {
    dispatch(fetchBooksByIdRejected(error.response));
  });
