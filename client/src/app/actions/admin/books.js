import { showErrorNotification, showSuccessNotification } from '../notifications';
import {
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE
} from '../actiontype';
import api from '../api';

export const CreateBookSuccess = book => ({ type: CREATE_BOOK_SUCCESS, book });
export const CreateBookFailure = error => ({ type: CREATE_BOOK_FAILURE, error });

/**
 * async helper function: log in user
 * @function BorrowBooks
 * @param {object} data
 * @returns {function} asynchronous action
 */
export const addBook = data => dispatch => api
  .admin
  .createBook(data)
  .then((response) => {
    dispatch(CreateBookSuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(CreateBookFailure({ error }));
    return ({ error });
  });
