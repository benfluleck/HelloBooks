import {
  FETCH_BOOKS,
  FETCH_BOOKS_FULFILLED,
  FETCH_BOOKS_BY_USER_ID,
  FETCH_BOOKS_FULFILLED_BY_USER_ID,
  BORROW_BOOKS_FAIL,
  BORROW_BOOKS_SUCCESS
} from '../actions/actiontype';

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
 * @param {object} action
 * @returns {object} state
 */
export default function bookReducer(state = {
  books: { books: [] },
  borrowedbooks: { books: [] },
  fetching: false,
  fetched: false,
  error: null
}, action) {
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
        borrowedbooks: action.books,
      };
    }
    case BORROW_BOOKS_SUCCESS:
    {
      return {
        ...state,
        loanbooks: action
      }
    }
    case BORROW_BOOKS_FAIL:
    {
      return {
        ...state,
        loanbooks:{},
        error: action
      }
    }
    default:
      return state;
  }
}
