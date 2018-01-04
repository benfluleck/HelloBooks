import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';
import api from './api';

/**
 * @description action to borrow book
 *
 * @param {object} book - book to borrow
 *
 * @returns {object} response
 */
const borrowBookAction = book => dispatch => api
  .book
  .borrowBook(book)
  .then((response) => {
    dispatch(showSuccessNotification(response));
    return (response);
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    return ({ error });
  });

export default borrowBookAction;
