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
 * @returns {function} asynchronous action
 */
export const borrowbooks = data => dispatch => api
  .book
  .loanbook(data)
  .then((response)=>{
    console.log(response, '??????')
    dispatch(LoanBooksSuccess(response))
    dispatch(showSuccessNotification(response))

  })
  .catch((error)=>{
    dispatch(showErrorNotification({error}))
    dispatch(LoanBooksRejected(error))
  })
  
