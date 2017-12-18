import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';
import {
  BORROW_BOOKS_SUCCESS,
} from './actionType';
import api from './api';


/**
 * =
 * @param {param} book
 *
 * @returns {void}
 */
export const borrowBooksSuccess = book =>
  ({
    type: BORROW_BOOKS_SUCCESS,
    book
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
    dispatch(borrowBooksSuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    return ({ error });
  });
