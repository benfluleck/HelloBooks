import { showErrorNotification, showSuccessNotification } from './notifications';
import {
  BORROW_BOOKS_SUCCESS,
  BORROW_BOOKS_FAIL
} from './actiontype';
import api from './api';

export const LoanBooksSuccess = books => ({ type: BORROW_BOOKS_SUCCESS, books });
export const LoanBooksRejected = error => ({ type: BORROW_BOOKS_FAIL, error });

/**
 * async helper function: log in user
 * @function BorrowBooks
 * @param {object} book
 * @returns {function} asynchronous action
 */
export const borrowbooks = book => dispatch => api
  .book
  .loanBook(book)
  .then((response) => {
    dispatch(LoanBooksSuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(LoanBooksRejected({ error }));
    return ({ error });
  });
