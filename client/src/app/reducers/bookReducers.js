import {
  FETCH_BOOKS,
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_REJECTED,
  FETCH_BOOKS_BY_USER_ID,
  FETCH_BOOKS_FULFILLED_BY_USER_ID,
  FETCH_BOOKS_REJECTED_BY_USER_ID
} from '../actions/actiontype.js';

/**
 * *
 *
 * @export
 * @param {boolean} [state={
 *   books: [],
 *   fetching: false,
 *   fetched: false,
 *   error: null
 * }]
 * @param {any} action
 * @returns {any} state
 */
export default function bookReducer (state = {
  books: [],
  fetching: false,
  fetched: false,
  error: null
}, action){
  switch (action.type) {
    case FETCH_BOOKS:
    {
      return {
        ...state,
        fetching: true,
        fetched: false
      };
    }

    case FETCH_BOOKS_BY_USER_ID:
    {
      return {
        ...state,
        fetching: true
      };
    }
    case FETCH_BOOKS_FULFILLED:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: action.books
      };
    }
    case FETCH_BOOKS_FULFILLED_BY_USER_ID:
    {
      return {
        ...state,
        fetching: false,
        fetched: true,
        borrowedbooks: action.books
      };
    }
    case FETCH_BOOKS_REJECTED:
    {
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    }
    case FETCH_BOOKS_REJECTED_BY_USER_ID:
    {
      return {
        ...state,
        fetching: false,
        error: action.error.message
      };
    }
    default:
      return state;
  }
}
