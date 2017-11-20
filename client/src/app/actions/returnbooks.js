import { showErrorNotification, showSuccessNotification } from './notifications';
import {
  RETURN_BOOKS_FAIL,
  RETURN_BOOKS_SUCCESS
} from './actiontype';
import api from './api';

export const ReturnBookSuccess = returnedbooks => ({ type: RETURN_BOOKS_SUCCESS, returnedbooks });
export const ReturnBookRejected = error => ({ type: RETURN_BOOKS_FAIL, error });

/**
 * async helper function: Return book
 * @function ReturnBooks
 * @returns {function} asynchronous action
 */
export const returnbook = data => dispatch => api
.book
.returnbook(data)
.then((response)=>{
  const message = response.message; 
  dispatch(showSuccessNotification({message}))
  dispatch(ReturnBookSuccess(response))
})
.catch((error)=>{
  dispatch(showErrorNotification({error}))
  dispatch(ReturnBookRejected(error))
})




