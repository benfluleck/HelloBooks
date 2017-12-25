import { mock, mockStore } from '../../__mocks__/mockConfig';
import {
  CREATE_BOOK_SUCCESS,
  addBook, updateBookDetails,
  deleteBookAction,
  UPDATE_BOOK_SUCCESS,
  DELETE_BOOK_SUCCESS
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';


describe('addBook action creator', () => {
  test('should successfully add a book to library', () => {
    const store = mockStore({ books: {} });
    const sucessMessage = 'Book added!, Sheep';
    mock.onPost().replyOnce(
      201,
      { message: sucessMessage }
    );
    store.dispatch(addBook(mockItems.testBook))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(CREATE_BOOK_SUCCESS);
      });
  });
  test('should return an error when the same book is added', () => {
    const store = mockStore({ books: {} });
    const errorMessage = 'A book with the same title and author already exists';

    mock.onPost().replyOnce(409, { message: errorMessage });
    store.dispatch(addBook(mockItems.testBook))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});

describe('updatedBook action creator', () => {
  test('should successfully update a book\'s details in the library', () => {
    const store = mockStore({ books: { } });
    const sucessMessage =
    'Sheep has been updated!';
    mock.onPut().replyOnce(
      200,
      { message: sucessMessage }
    );
    store.dispatch(updateBookDetails(
      mockItems.testBook.id,
      mockItems.bookDetails.book
    ))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(UPDATE_BOOK_SUCCESS);
      });
  });
  test('should return an error when a book with no id is being updated', () => {
    const store = mockStore({ books: {} });
    const errorMessage = 'Book does not exist in this database';

    mock.onPut().replyOnce(404, { message: errorMessage });
    store.dispatch(updateBookDetails(mockItems.bookWithNoId))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });

  describe('deleteBook action creator', () => {
    test('should successfully delete a book in the library', () => {
      const store = mockStore({ books: {} });
      const sucessMessage = 'Sheep has been deleted';
      mock.onDelete().replyOnce(
        200,
        { message: sucessMessage }
      );
      store.dispatch(deleteBookAction(mockItems.testBook.id))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(2);
          expect(actions[0].type).toBe(DELETE_BOOK_SUCCESS);
        });
    });
    test('should return an error when' +
    'a book without an id is being deleted', () => {
      const store = mockStore({ books: {} });
      const errorMessage = 'Book not exist';
      mock.onDelete().replyOnce(404, { message: errorMessage });
      store.dispatch(deleteBookAction())
        .then(() => store.getActions())
        .then((error) => {
          expect(error[0].payload.message).toEqual(errorMessage);
        });
    });
  });
});
