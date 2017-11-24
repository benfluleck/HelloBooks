import { showErrorNotification } from './notifications';
import { LOAN_HISTORY_FAILURE, LOAN_HISTORY_SUCCESS } from './actiontype';
import api from './api';

export const loanhistorySuccess = bookOperations => ({
  type: LOAN_HISTORY_SUCCESS,
  bookOperations
});
export const loanhistoryFailure = error => ({ type: LOAN_HISTORY_FAILURE, error });

/**
 * async helper function: loan history
 * @function loanhistory
 * @param {integer} offset
 * @param {integer} limit
 * @returns {function} asynchronous action
 */
export const loanhistory = (offset, limit) => dispatch => api
  .book
  .loanhistory(offset, limit)
  .then((response) => {
    dispatch(loanhistorySuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }))
    dispatch(loanhistoryFailure({ error }));
  });
