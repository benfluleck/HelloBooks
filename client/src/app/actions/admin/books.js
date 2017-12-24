import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  CREATE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS
} from '../actionType';
import api from '../api';

export const createBookSuccess = book =>
  ({
    type: CREATE_BOOK_SUCCESS,
    book
  });

export const updateBookSuccess = book =>
  ({
    type: UPDATE_BOOK_SUCCESS,
    book
  });
export const deleteBookSuccess = book =>
  ({
    type: DELETE_BOOK_SUCCESS,
    book
  });


/**
 * async helper function: add Book to the database
 *
 * @function addBook
 *
 * @param {object} bookDetails
 *
 * @returns {function} asynchronous action
 */
export const addBook = bookDetails => dispatch => api
  .admin
  .createBook(bookDetails)
  .then((response) => {
    dispatch(createBookSuccess(response));
    dispatch(showSuccessNotification(response));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });

/**
 * async helper function: add Book to the database
 *
 * @function editBook
 *
 * @param {number} bookId
 *
 * @param {object} bookDetails
 *
 * @returns {function} asynchonrous action
 */
export const updateBookDetails = (bookId, bookDetails) => dispatch => api
  .admin
  .updateBook(bookId, bookDetails)
  .then((response) => {
    dispatch(updateBookSuccess(response));
    dispatch(showSuccessNotification(response));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });

export const deleteBookAction = bookId => dispatch => api
  .admin
  .deleteBook(bookId)
  .then((response) => {
    dispatch(deleteBookSuccess(response));
    dispatch(showSuccessNotification(response));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
  });
