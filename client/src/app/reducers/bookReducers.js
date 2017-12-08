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
  FETCH_ALL_OVERDUE_BOOKS,
  SEARCH_BOOKS_SUCCESS,
  SEARCH_BOOKS_FAILURE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_BOOKS_FOR_CATEGORIES_SUCCESS,
  FETCH_BOOKS_FOR_CATEGORIES_FAILURE,
  FETCH_SELECTED_BOOK_SUCCESS,
  FETCH_SELECTED_BOOK_FAILURE,
  CREATE_BOOK_FAILURE,
  CREATE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  UPDATE_BOOK_FAILURE
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
    case SEARCH_BOOKS_SUCCESS:
    {
      return {
        ...state,
        allBooksList:
          action.books
      };
    }
    case SEARCH_BOOKS_FAILURE:
    {
      return {
        ...state,
        error: action.message
      };
    }
    case UPDATE_BOOK_SUCCESS:
    {
      return {
        ...state,
        error: action.book
      };
    }
    case UPDATE_BOOK_FAILURE:
    {
      return {
        ...state,
        error: action.book
      };
    }
    case FETCH_CATEGORIES_SUCCESS:
    {
      return {
        ...state,
        categoryList: action.categories.categories
      };
    }
    case FETCH_CATEGORIES_FAILURE:
    {
      return {
        ...state,
        error: action.error
      };
    }
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
    case FETCH_SELECTED_BOOK_SUCCESS:
    {
      return {
        ...state,
        book: action.book
      };
    }
    case FETCH_SELECTED_BOOK_FAILURE:
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
    case FETCH_BOOKS_FOR_CATEGORIES_SUCCESS:
    {
      return {
        ...state,
        allBooksList:
          action.books
      };
    }
    case FETCH_BOOKS_FOR_CATEGORIES_FAILURE:
    {
      return {
        ...state,
        error: action
      };
    }

    case CREATE_BOOK_SUCCESS:
    {
      return {
        ...state,
        allBooksList: {
          ...state.allBooksList,
          books:
          [action.book.createdBook,
            ...state.allBooksList.books]
        }
      };
    }
    case CREATE_BOOK_FAILURE:
    {
      return {
        ...state,
        error: action
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
            .filter(book => book.bookId !== action.returnedBook.id)
        },
        overdueBooksList: {
          ...state.overdueBooksList,
          books: state
            .overdueBooksList
            .books
            .filter(book => book.bookId !== action.returnedBook.id)
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
        error: action

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
