import bookReducer from '../../src/app/reducers/bookReducers';
import { searchBookSuccess } from '../../src/app/actions/searchBooks';
import { fetchBorrowedBooks,
  fetchBooks,
  fetchSelectedBookSuccess,
} from '../../src/app/actions/fetchBooks';
import { createBookSuccess,
  updateBookSuccess,
} from '../../src/app/actions/admin/books';
import {
  fetchBooksCategoriesSuccess
} from '../../src/app/actions/fetchCategories';
import { returnBookSuccess } from '../../src/app/actions/returnBooks';

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
    id: 2, title: 'Amarachi', author: 'Akon'
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
    console.log(newState,'oldey but goodey00000000000000');
    action = updateBookSuccess(newBook.updatedBook);
    console.log(action,'----------');
    newState = bookReducer(newState, action);
    console.log(newState,'newbie00000000000000');
    expect(newState.allBooksList.books).toHaveLength(3);
    //expect(newState.allBooksList.books[0]).toEqual(newBook.updatedBook);
  });

  // it('should handle action to FETCH_BORROWED_BOOKS', () => {
  //   action = fetchBorrowedBooks(allBooksList.books);
  //   newState = bookReducer(newState, action);
  //   expect(newState).not.toEqual(bookReducer({}, action));
  //   expect(newState.borrowedBooksList).toEqual(allBooksList.books);
  //   expect(newState.borrowedBooksList[1].id).toBe(2);
  // });

  // it('should handle action to FETCH_ALL_BOOKS', () => {
  //   action = fetchBooks(allBooksList.books);
  //   newState = bookReducer(newState, action);
  //   expect(newState).not.toEqual(bookReducer({}, action));
  //   expect(newState.borrowedBooksList).toEqual(allBooksList.books);
  //   expect(newState.borrowedBooksList[1].id).toBe(2);
  // });

  // it('should handle action to FETCH_SELECTED_BOOK_SUCCESS', () => {
  //   action = fetchSelectedBookSuccess(newBook.createdBook);
  //   newState = bookReducer(newState, action);
  //   expect(newState).not.toEqual(bookReducer({}, action));
  //   expect(newState.book).toEqual(newBook.createdBook);
  // });

  // it('should handle action to FETCH_SELECTED_BOOK_SUCCESS', () => {
  //   action = fetchSelectedBookSuccess(newBook.createdBook);
  //   newState = bookReducer(newState, action);
  //   expect(newState).not.toEqual(bookReducer({}, action));
  //   expect(newState.book).toEqual(newBook.createdBook);
  // });

  // it('should handle action to FETCH_BOOKS_FOR_CATEGORIES_SUCCESS', () => {
  //   action = fetchBooksCategoriesSuccess(allBooksList.books);
  //   newState = bookReducer(newState, action);
  //   expect(newState).not.toEqual(bookReducer({}, action));
  //   expect(newState.allBooksList).toEqual(allBooksList.books);
  // });

  // it('should handle action to RETURN_BOOK_SUCCESS', () => {
  //   console.log(newState, '=======');
  //   action = returnBookSuccess(allBooksList.books[1]);
  //   console.log(action, 'i Am an action');
  //   newState = bookReducer(newState, action);
  //   console.log(newState, '....................');
  //   // console.log(newState,'vvvvvvv', action, '>>>>>>>>>????')

  //   // expect(newState).not.toEqual(bookReducer({}, action));
  //   // expect(newState.returnedBook).toEqual(newBook.bookToBorrow);
  // });
});
