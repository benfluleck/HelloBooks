import {
  FETCH_ALL_RECENT_BOOKS,
  FETCH_BOOKS_BY_USER_ID,
  FETCH_ALL_BOOKS,
  FETCH_BOOKS_REJECTED,
  BORROW_BOOKS_FAIL,
  BORROW_BOOKS_SUCCESS,
  RETURN_BOOKS_FAIL,
  RETURN_BOOKS_SUCCESS,
  LOAN_HISTORY_FAILURE,
  LOAN_HISTORY_SUCCESS,
  FETCHING_BOOKS,
  FETCH_ALL_OVERDUE_BOOKS
} from '../actions/actiontype';

/**
 * *
 *
 * @export
 * @param {object} [state={
 * }]
 * @param {object} action
 * @returns {object} state
 */
export default function bookReducer(state = {
}, action) {
  switch (action.type) {
    case FETCHING_BOOKS:
      return {
        ...state,
        fetchingBooks: action.state
      };
    case FETCH_ALL_OVERDUE_BOOKS:
    {
      return {
        ...state,
        overdueBooksList: action.books
      };
    }
    case FETCH_BOOKS_BY_USER_ID:
    {
      return {
        ...state,
        borrowedBooksList: action.books
      };
    }
    case FETCH_ALL_RECENT_BOOKS:
    {
      return {
        ...state,
        recentBooksList: action.books.books
      };
    }
    case FETCH_ALL_BOOKS:
    {
      return {
        ...state,
        allBooksList: action.books
      };
    }
    case FETCH_BOOKS_REJECTED:
    {
      return {
        ...state,
        error: action
      };
    }
    case BORROW_BOOKS_SUCCESS:
    {
      return {
        ...state,
        loanbooks: action
      };
    }
    case BORROW_BOOKS_FAIL:
    {
      return {
        ...state,
        loanbooks: {},
        error: action
      };
    }
    case RETURN_BOOKS_SUCCESS:
    {
      return {
        ...state,
        borrowedBooksList: {
          ...state.borrowedBooksList,
          books: state
            .borrowedBooksList
            .books
            .filter(book => book.bookid !== action.returnedBook.id)
        },
        overdueBooksList: {
          ...state.overdueBooksList,
          books: state
            .overdueBooksList
            .books
            .filter(book => book.bookid !== action.returnedBook.id)
        }

      };
    }
    case RETURN_BOOKS_FAIL:
    {
      return {
        ...state,
        returnedbooks: {},
        error: action
      };
    }
    case LOAN_HISTORY_FAILURE:
    {
      return {
        ...state,
        error

      };
    }
    case LOAN_HISTORY_SUCCESS:
    {
      return {
        ...state,
        bookOperations: action.bookOperations
      };
    }

    default:
      return state;
  }
}
