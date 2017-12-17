import { showErrorNotification } from './notifications';
import {
  LOAN_HISTORY_FAILURE,
  LOAN_HISTORY_SUCCESS } from './actionType';
import api from './api';

export const loanHistorySuccess = bookOperations => ({
  type: LOAN_HISTORY_SUCCESS,
  bookOperations
});
export const loanHistoryFailure = error => ({
  type: LOAN_HISTORY_FAILURE, error
});

/**
 * async helper function: loan history
 *
 * @function loanhistory
 *
 * @param {integer} offset
 *
 * @param {integer} limit
 *
 * @returns {function} asynchronous action
 */
export const loanHistoryAction = (offset, limit) => dispatch => api
  .book
  .loanHistory(offset, limit)
  .then((response) => {
    dispatch(loanHistorySuccess(response));
    return response;
  })
  .catch((error) => {
    dispatch(showErrorNotification({ error }));
    dispatch(loanHistoryFailure({ error }));
  });
