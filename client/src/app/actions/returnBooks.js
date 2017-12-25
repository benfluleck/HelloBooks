import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';
import {
  RETURN_BOOKS_SUCCESS
} from './actionType';
import api from './api';

export const returnBookSuccess = returnedBook =>
  ({
    type: RETURN_BOOKS_SUCCESS,
    returnedBook
  });


/**
 * async helper function: Return book
 *
 * @function ReturnBooks
 *
 * @param {object} book
 *
 * @returns {function} asynchronous action
 */
export const returnBookAction = book => dispatch => api
  .book
  .returnBook(book)
  .then((response) => {
    dispatch(showSuccessNotification(response));
    dispatch(returnBookSuccess(response.returnedBook));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });
