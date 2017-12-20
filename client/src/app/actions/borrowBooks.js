import {
  showErrorNotification,
  showSuccessNotification
} from './notifications';
import api from './api';

/**
 *
 * @param {object} book
 * @returns {void}
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
