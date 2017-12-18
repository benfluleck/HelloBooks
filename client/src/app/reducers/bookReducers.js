import {
  FETCH_ALL_RECENT_BOOKS,
  FETCH_BORROWED_BOOKS,
  FETCH_ALL_BOOKS,
  FETCH_BOOKS_REJECTED,
  BORROW_BOOKS_SUCCESS,
  RETURN_BOOKS_FAIL,
  RETURN_BOOKS_SUCCESS,
  LOAN_HISTORY_FAILURE,
  LOAN_HISTORY_SUCCESS,
  FETCH_ALL_OVERDUE_BOOKS,
  SEARCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FOR_CATEGORIES_SUCCESS,
  FETCH_BOOKS_FOR_CATEGORIES_FAILURE,
  FETCH_SELECTED_BOOK_SUCCESS,
  FETCH_SELECTED_BOOK_FAILURE,
  CREATE_BOOK_FAILURE,
  CREATE_BOOK_SUCCESS,
  UPDATE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  DELETE_BOOK_SUCCESS,
} from '../actions/actionType';

/**
 * *
 *
 * @export
 * @param {object} [state={
 * }]
 *
 * @param {object} action
 *
 * @returns {object} state
 */
export default function bookReducer(state = {
}, action) {
  switch (action.type) {
    case SEARCH_BOOKS_SUCCESS:
      return { ...state, allBooksList: action.books };
    case UPDATE_BOOK_SUCCESS:
      return {
        ...state,
        allBooksList: {
          ...state.allBooksList,
          books: [action.book.updatedBook,
            ...state
              .allBooksList
              .books
              .filter(book => book.bookId !== action.book.updatedBook.id),
          ]
        }
      };
    case FETCH_ALL_OVERDUE_BOOKS:

      return {
        ...state,
        overdueBooksList: action.books
      };

    case FETCH_BORROWED_BOOKS:

      return {
        ...state,
        borrowedBooksList: action.books
      };

    case FETCH_ALL_RECENT_BOOKS:
      return {
        ...state,
        recentBooksList: action.books.books
      };

    case FETCH_ALL_BOOKS:
      return {
        ...state,
        allBooksList: action.books
      };

    case FETCH_BOOKS_REJECTED:
      return {
        ...state,
        error: action
      };
    case FETCH_SELECTED_BOOK_SUCCESS:

      return {
        ...state,
        book: action.book
      };

    case FETCH_SELECTED_BOOK_FAILURE:

      return {
        ...state,
        error: action
      };

    case BORROW_BOOKS_SUCCESS:

      return {
        ...state,
        loanbooks: action
      };

    case FETCH_BOOKS_FOR_CATEGORIES_SUCCESS:

      return {
        ...state,
        allBooksList: action.books
      };

    case FETCH_BOOKS_FOR_CATEGORIES_FAILURE:

      return {
        ...state,
        error: action
      };

    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        allBooksList: {
          ...state.allBooksList,
          books:
          [action.book.createdBook,
            ...state.allBooksList.books]
        }
      };
    case CREATE_BOOK_FAILURE:

      return {
        ...state,
        error: action
      };

    case RETURN_BOOKS_SUCCESS:

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

    case RETURN_BOOKS_FAIL:

      return {
        ...state,
        returnedbooks: {},
        error: action
      };

    case LOAN_HISTORY_FAILURE:

      return {
        ...state,
        error: action

      };

    case LOAN_HISTORY_SUCCESS:

      return {
        ...state,
        bookOperations: action.bookOperations
      };

    case DELETE_BOOK_SUCCESS:

      return {
        ...state,
        allBooksList: {
          ...state.allBooksList,
          books: state
            .allBooksList
            .books
            .filter(book => book.id !== action.book.deletedBookId),
        },
      };

    case DELETE_BOOK_FAILURE:

      return {
        ...state,
        error: action

      };


    default:
      return state;
  }
}
