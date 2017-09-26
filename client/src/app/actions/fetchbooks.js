import { FETCH_BOOKS } from './type';
import { FETCH_BOOKS_FULFILLED } from './type';
import { FETCH_BOOKS_REJECTED } from './type';
import api from './api';

export const fetchBooks = books => ({ type: FETCH_BOOKS, books });
export const fetchBooksRejected = error => ({ type: FETCH_BOOKS_REJECTED, error });
export const fetchBooksfufilled = books => ({ type: FETCH_BOOKS_FULFILLED, books });

/**
 * fetch books in thhe Library
 * @return {any} dispatches an action
 */
export const fetchAllBooks = () => dispatch =>
  api
    .book
    .fetch()
    .then((response) => {
      dispatch(fetchBooksfufilled(response.book));
    })
    .catch((error) => {
      dispatch(fetchBooksRejected(error.response.message));
    });
