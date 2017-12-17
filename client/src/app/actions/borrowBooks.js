import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';
import {
  BORROW_BOOKS_SUCCESS,
  BORROW_BOOKS_FAIL
} from './actionType';
import api from './api';

export const BorrowBooksSuccess = books =>
  ({
    type: BORROW_BOOKS_SUCCESS,
    books
  });
export const BorrowBooksRejected = error =>
  ({
    type: BORROW_BOOKS_FAIL,
    error
  });

/*
 * async helper function: log in user
 *
 * @function BorrowBooks
 *
 * @param {object} book
 *
 * @returns {function} asynchronous action
 */
export const borrowBookAction = book => dispatch => api
  .book
  .borrowBook(book)
  .then((response) => {
    dispatch(BorrowBooksSuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(BorrowBooksRejected({ error }));
    return ({ error });
  });
