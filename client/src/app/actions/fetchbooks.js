import { FETCH_BOOKS,
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_REJECTED } from './type';
import api from './api';

export const fetchBooks = books => ({ type: FETCH_BOOKS, books });
export const fetchBooksRejected = error => ({ type: FETCH_BOOKS_REJECTED, error });
export const fetchBooksfufilled = books => ({ type: FETCH_BOOKS_FULFILLED, books });

/**
 * fetch books in thhe Library
 * @return {any} dispatches an action
 */
export const fetchAllBooks = (offset, limit) => dispatch => api
  .book
  .fetch(offset, limit)
  .then((response) => {
    dispatch(fetchBooksfufilled(response));
  })
  .catch((error) => {
    dispatch(fetchBooksRejected(error.response));
  });
