import { showErrorNotification, showSuccessNotification } from './notifications';
import { RETURN_BOOKS_FAIL, RETURN_BOOKS_SUCCESS } from './actiontype';
import api from './api';

export const ReturnBookSuccess = returnedBook => ({ type: RETURN_BOOKS_SUCCESS, returnedBook });
export const ReturnBookRejected = error => ({ type: RETURN_BOOKS_FAIL, error });

/**
 * async helper function: Return book
 * @function ReturnBooks
 * @param {object} book
 * @returns {function} asynchronous action
 */
export const returnBookAction = book => dispatch => api
  .book
  .returnBook(book)
  .then((response) => {
    dispatch(ReturnBookSuccess(response.returnedBook));
    dispatch(showSuccessNotification(response));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(ReturnBookRejected(error));
  });
