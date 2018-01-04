import bookReducer from '../../src/app/reducers/bookReducers';
import { searchBookSuccess } from '../../src/app/actions/searchBooks';
import { fetchBorrowedBooks,
  fetchBooks,
  fetchRecentBooks,
  fetchSelectedBookSuccess,
  fetchSelectedBookFailure,
  fetchBooksRejected,
  fetchOverdueBooks
} from '../../src/app/actions/fetchBooks';
import { loanHistorySuccess,
  loanHistoryFailure } from '../../src/app/actions/loanHistory';
import {
  createBookSuccess,
  updateBookSuccess,
  deleteBookSuccess
} from '../../src/app/actions/admin/books';
import {
  fetchBooksCategoriesSuccess,
  fetchBooksCategoriesFailure
} from '../../src/app/actions/fetchCategories';
import { returnBookSuccess } from '../../src/app/actions/returnBooks';

let action;
let newState;

const initialState = {
  allBooksList: { books: [] },
  borrowedBooksList: { },
  overdueBooksList: { books: [] },
  bookOperations: {}
};

const allBooksList = {
  books: [
    {
      id: 1, title: 'AndelaOne', author: 'Dinobi', quantity: 10
    },
    {
      id: 2, title: 'PewdiPie', author: 'Dinobi', quantity: 5
    }
  ],
  pagination: {
    pageSize: 1, pageNumber: 1, pageCount: 1, totalCount: 1
  }
};

const overdueBooksData = {

  books: [
    {
      id: 3,
      bookId: 3,
      title: 'Andela The Great',
      author: 'Solomon Grundy',
      quantity: 10
    },
    {
      id: 4,
      bookId: 4,
      title: 'PewdiPie from YouTube',
      author: 'Dinobi',
      quantity: 5
    }
  ],
  pagination: {
    pageSize: 1, pageNumber: 1, pageCount: 1, totalCount: 1
  }
};


const borrowedBookData = {
  books: [
    {
      id: 1, bookId: 1, title: 'AndelaOne', author: 'Dinobi', quantity: 10
    }
  ],
  pagination: {
    pageSize: 1, pageNumber: 1, pageCount: 1, totalCount: 1
  }
};

const newBook = {
  createdBook: {
    id: 3, title: 'Sterling', author: 'Oare', quantity: 2
  },
  updatedBookData: {
    message: 'Amarachi has been updated successfully',
    updatedBook: { id: 2, title: 'Amarachi', author: 'Akon' }
  },
  bookToBorrow: {
    id: 4, title: 'Amarachi', author: 'Akon', categoryId: 1, quantity: 4
  },
  bookTodelete: {
    message: 'AndelOne has been deleted',
    deletedBookId: 2

  }

};

describe('Book Reducer', () => {
  const applicationInitialState = {
    overdueBooksList: {
      books: [],
      pagination: {}
    }
  };
  it(' should return Initial state for undefined prop types', () => {
    expect(bookReducer(
      undefined,
      { type: 'undefinedAction' }
    )).toEqual(applicationInitialState);
  });

  it('should handle action type SEARCH_BOOK_SUCCESS', () => {
    action = searchBookSuccess(allBooksList);
    newState = bookReducer(initialState, action);
    expect(newState.allBooksList).toEqual(allBooksList);
    expect(newState.allBooksList.books).toEqual(allBooksList.books);
  });

  it('should handle action type CREATE_BOOK_SUCCESS', () => {
    action = createBookSuccess(newBook);
    newState = bookReducer(newState, action);
    expect(newState.allBooksList.books).toHaveLength(3);
    expect(newState.allBooksList.books[0]).toEqual(newBook.createdBook);
  });

  it('should handle action type UPDATE_BOOK_SUCCESS', () => {
    action = updateBookSuccess(newBook.updatedBookData);
    newState = bookReducer(newState, action);
    expect(newState.allBooksList.books).toHaveLength(3);
    expect(newState.allBooksList.books[0])
      .toEqual(newBook.updatedBookData.updatedBook);
    expect(newState.allBooksList.books[0].title)
      .not.toEqual('PewdiPie');
  });

  it('should handle action to FETCH_BORROWED_BOOKS', () => {
    action = fetchBorrowedBooks(borrowedBookData);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.borrowedBooksList.books).toEqual(borrowedBookData.books);
    expect(newState.borrowedBooksList.books[0].id).toBe(1);
  });

  it('should handle action to FETCH_ALL_BOOKS', () => {
    action = fetchBooks(allBooksList);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.allBooksList).toEqual(allBooksList);
  });

  it('should handle action to FETCH_ALL_RECENT_BOOKS', () => {
    action = fetchRecentBooks(allBooksList);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.allBooksList).toEqual(allBooksList);
  });

  it('should handle action to FETCH_SELECTED_BOOK_SUCCESS', () => {
    action = fetchSelectedBookSuccess(newBook.createdBook);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.book).toEqual(newBook.createdBook);
  });

  it('should handle action to FETCH_SELECTED_BOOK_SUCCESS', () => {
    action = fetchSelectedBookSuccess(newBook.createdBook);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.book).toEqual(newBook.createdBook);
  });

  it('should handle action to FETCH_BOOKS_FOR_CATEGORIES_SUCCESS', () => {
    action = fetchBooksCategoriesSuccess(allBooksList);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.allBooksList).toEqual(allBooksList);
  });

  it('should handle action to RETURN_BOOK_SUCCESS to'
  + 'return a Borrowed book', () => {
    action = returnBookSuccess(borrowedBookData.books[0]);
    newState = bookReducer(newState, action);
    expect(newState.borrowedBooksList.books).toHaveLength(0);
    expect(newState.borrowedBooksList.books).toEqual([]);
  });

  it('should handle action to LOAN_HISTORY_SUCCESS', () => {
    action = loanHistorySuccess(borrowedBookData);
    newState = bookReducer(newState, action);
    expect(newState.bookOperations.books).toHaveLength(1);
    expect(newState.bookOperations.books).toEqual(borrowedBookData.books);
  });

  it('should handle action to DELETE_BOOK_SUCCESS', () => {
    action = deleteBookSuccess(newBook.bookTodelete);
    newState = bookReducer(newState, action);
    expect(newState.allBooksList.books).toHaveLength(1);
    expect(newState.allBooksList.books).toContain(allBooksList.books[0]);
    expect(newState.allBooksList.books).not.toContain(allBooksList.books[1]);
  });

  it('should handle action to FETCH_ALL_OVERDUE_BOOKS', () => {
    action = fetchOverdueBooks(overdueBooksData);
    newState = bookReducer(newState, action);
    expect(newState.overdueBooksList.books).toHaveLength(2);
    expect(newState.overdueBooksList.books)
      .toContain(overdueBooksData.books[0]);
  });

  it('should handle action to RETURN_BOOK_SUCCESS' +
  'to return an Overdue Book ', () => {
    action = returnBookSuccess(overdueBooksData.books[0]);
    newState = bookReducer(newState, action);
    expect(newState.overdueBooksList.books).toHaveLength(1);
  });

  it('should handle action to FETCH_SELECTED_BOOK_FAILURE', () => {
    action = fetchSelectedBookFailure();
    newState = bookReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });

  it('should handle action to FETCH_BOOKS_REJECTED', () => {
    action = fetchBooksRejected();
    newState = bookReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });

  it('should handle action to LOAN_HISTORY_FAILURE', () => {
    action = loanHistoryFailure();
    newState = bookReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });

  it('should handle action to FETCH_BOOKS_FOR_CATEGORIES_FAILURE ', () => {
    action = fetchBooksCategoriesFailure();
    newState = bookReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });
});
