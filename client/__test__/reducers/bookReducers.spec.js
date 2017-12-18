import bookReducer from '../../src/app/reducers/bookReducers';
import { searchBookSuccess } from '../../src/app/actions/searchBooks';
import { borrowBooksSuccess } from '../../src/app/actions/borrowBooks';
import { fetchBorrowedBooks } from '../../src/app/actions/fetchBooks';
import { createBookSuccess,
  updateBookSuccess,
} from '../../src/app/actions/admin/books';

let action;
let newState;

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

const newBook = {
  createdBook: {
    id: 3, title: 'Sterling', author: 'Oare', quantity: 2
  },
  updatedBook: {
    id: 4, title: 'Amarachi', author: 'Akon'
  },
  bookToBorrow: {
    id: 4, title: 'Amarachi', author: 'Akon', categoryId: 1, quantity: 4
  }

};

describe('Book Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(bookReducer(undefined, { type: 'undefinedAction' })).toEqual({});
  });

  it('should handle action type SEARCH_BOOK_SUCCESS', () => {
    action = searchBookSuccess(allBooksList);
    newState = bookReducer({}, action);
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
    action = updateBookSuccess(newBook);
    newState = bookReducer(newState, action);
    expect(newState.allBooksList.books).toHaveLength(4);
    expect(newState.allBooksList.books[0]).toEqual(newBook.updatedBook);
  });
  it('should handle action type BORROW_BOOK_SUCCESS', () => {
    action = borrowBooksSuccess(newBook.bookToBorrow);
    newState = bookReducer({}, action);
    expect(newState.loanbooks.book).toEqual(newBook.bookToBorrow);
    expect(newState.loanbooks.book).not.toEqual(bookReducer({}, action));
    expect(newState.loanbooks.book.quantity).toEqual(4);
  });
  it('should handle action to FETCH_BORROWED_BOOKS', () => {
    action = fetchBorrowedBooks(allBooksList.books);
    newState = bookReducer(newState, action);
    expect(newState).not.toEqual(bookReducer({}, action));
    expect(newState.borrowedBooksList).toEqual(allBooksList.books);
    expect(newState.borrowedBooksList[1].id).toBe(2);
  });
});
