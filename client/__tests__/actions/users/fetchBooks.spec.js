import { mock, mockStore } from '../../__mocks__/mockConfig';

import { FETCH_ALL_BOOKS,
  FETCH_ALL_OVERDUE_BOOKS,
  FETCH_ALL_RECENT_BOOKS,
  FETCH_BOOKS_REJECTED,
  FETCH_BORROWED_BOOKS,
  FETCH_SELECTED_BOOK_SUCCESS,
  FETCH_SELECTED_BOOK_FAILURE,
  fetchAllBooks,
  fetchAllBorrowedBooks,
  fetchAllRecentBooks,
  fetchSelectedBook,
  fetchOverdueBookstoDashboard
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

const offset = 0;
const limit = 8;
describe('Fetch all books action', () => {
  test('should successfully fetch all the books in the library', () => {
    const store = mockStore({ allBooksList: { } });
    mock.onGet().replyOnce(
      200,
      { allBooksList: mockItems.allBooksList }
    );
    store.dispatch(fetchAllBooks(offset, limit))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(FETCH_ALL_BOOKS);
      });
  });
  test('should return an error when no books are in the library', () => {
    const errorMessage = 'No Books found';
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(fetchAllBooks(offset, limit))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(FETCH_BOOKS_REJECTED);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});

describe('Fetch all recent books action', () => {
  test(`should successfully fetch all ` +
  `the recently added books in the library`, () => {
    const store = mockStore({ recentBooksList: { } });
    mock.onGet().replyOnce(
      200,
      { recentBooksList: mockItems.allBooksList }
    );
    store.dispatch(fetchAllRecentBooks(offset, limit))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(FETCH_ALL_RECENT_BOOKS);
      });
  });
  test('should return an error when tthere are no books in the library', () => {
    const errorMessage = 'No Books found';
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(fetchAllRecentBooks(offset, limit))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(FETCH_BOOKS_REJECTED);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});

describe('Fetch all borrowed books action', () => {
  test(`should successfully fetch all ` +
  `the books borrowed books by the user in the library`, () => {
    const store = mockStore({ recentBooksList: { } });
    mock.onGet().replyOnce(
      200,
      { borrowedBooksList: mockItems.allBooksList }
    );
    store.dispatch(fetchAllBorrowedBooks(offset, limit))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(FETCH_BORROWED_BOOKS);
      });
  });
  test('should return an error when the user has no borrowed books', () => {
    const errorMessage = 'No Books found';
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(fetchAllBorrowedBooks(offset, limit))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(FETCH_BOOKS_REJECTED);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});

describe('Fetch all overdue books action', () => {
  test(`should successfully fetch all ` +
  `the user's overdue books in the library`, () => {
    const store = mockStore({ overdueBooksList: { } });
    mock.onGet().replyOnce(
      200,
      { overdueBooksList: mockItems.allBooksList }
    );
    store.dispatch(fetchOverdueBookstoDashboard(offset, limit))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(FETCH_ALL_OVERDUE_BOOKS);
      });
  });
  test('should return an error when the user has no overdue books', () => {
    const errorMessage = 'No Books found';
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(fetchOverdueBookstoDashboard(offset, limit))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(FETCH_BOOKS_REJECTED);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});

describe('Fetch selected book action', () => {
  test('should successfully fetch selcted book', () => {
    const store = mockStore({ book: { } });
    mock.onGet().replyOnce(
      200,
      { book: mockItems.bookDetails.book }
    );
    store.dispatch(fetchSelectedBook(mockItems.bookDetails.book.id))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(FETCH_SELECTED_BOOK_SUCCESS);
      });
  });
  test('should return an error when id of book is not specified', () => {
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { book: mockItems.bookWithNoId }
    );
    store.dispatch(fetchSelectedBook(mockItems.bookWithNoId))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(FETCH_SELECTED_BOOK_FAILURE);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});
