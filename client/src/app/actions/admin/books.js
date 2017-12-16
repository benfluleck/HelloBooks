import {
  showErrorNotification,
  showSuccessNotification
} from '../notifications';
import {
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_FAILURE,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS
} from '../actiontype';
import api from '../api';

export const CreateBookSuccess = book =>
  ({
    type: CREATE_BOOK_SUCCESS,
    book
  });
export const CreateBookFailure = error =>
  ({
    type: CREATE_BOOK_FAILURE,
    error
  });

export const UpdateBookSuccess = book =>
  ({
    type: UPDATE_BOOK_SUCCESS,
    book
  });
export const UpdateBookFailure = error =>
  ({
    type: UPDATE_BOOK_FAILURE,
    error
  });
export const DeleteBookSuccess = book =>
  ({
    type: DELETE_BOOK_SUCCESS,
    book
  });
export const DeleteBookFailure = error =>
  ({
    type: DELETE_BOOK_FAILURE,
    error
  });

/**
 * async helper function: add Book to the database
 * @function addBook
 * @param {object} bookDetails
 * @returns {function} asynchronous action
 */
export const addBook = bookDetails => dispatch => api
  .admin
  .createBook(bookDetails)
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

/**
 * async helper function: add Book to the database
 * @function editBook
 * @param {number} bookId
 * @param {object} bookDetails
 * @returns {function} asynchonrous action
 */
export const updateBookDetails = (bookId, bookDetails) => dispatch => api
  .admin
  .updateBook(bookId, bookDetails)
  .then((response) => {
    dispatch(UpdateBookSuccess(response));
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(UpdateBookFailure({ error }));
    return ({ error });
  });

export const deleteBookAction = bookId => dispatch => api
  .admin
  .deleteBook(bookId)
  .then((response) => {
    dispatch(DeleteBookSuccess(response));
    dispatch(showSuccessNotification(response));
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(DeleteBookFailure({ error }));
    return ({ error });
  });
