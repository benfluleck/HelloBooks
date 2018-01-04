import { mock, mockStore } from '../../__mocks__/mockConfig';

import {
  FETCH_BOOKS_FOR_CATEGORIES_FAILURE,
  FETCH_BOOKS_FOR_CATEGORIES_SUCCESS,
  fetchAllCategories,
  fetchBooksForCategories,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_SUCCESS
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

const offset = 0;
const limit = 8;
describe('Fetch all books by categories action', () => {
  test(
    `should successfully fetch all the books in the library and ' +
      'group them by their categories`,
    () => {
      const store = mockStore({});
      const books = mockItems.allBooksList;
      mock
        .onGet()
        .replyOnce(200, books);
      store
        .dispatch(fetchBooksForCategories(
          mockItems.category
            .categoryId,
          offset,
          limit
        ))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions.length).toBe(1);
          expect(actions[0].type).toBe(FETCH_BOOKS_FOR_CATEGORIES_SUCCESS);
        });
    }
  );

  test('should return an error when no books '
 + 'are in the selected category', () => {
    const errorMessage = 'No Books found';
    const store = mockStore({});

    mock
      .onGet()
      .replyOnce(404, { books: {}, message: errorMessage });
    store
      .dispatch(fetchBooksForCategories(mockItems.category
        .categoryId, offset, limit))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[1].type).toBe(FETCH_BOOKS_FOR_CATEGORIES_FAILURE);
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});

describe('Fetch all categories action', () => {
  test('should successfully fetch all the categories in the library', () => {
    const store = mockStore({ categories: {} });
    mock
      .onGet()
      .replyOnce(200, { categories: mockItems.category });
    store
      .dispatch(fetchAllCategories())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(FETCH_CATEGORIES_SUCCESS);
      });
  });
  test('should return an error when no categories are in the library', () => {
    const errorMessage = 'Sorry there are no categories available';
    const store = mockStore({});

    mock
      .onGet()
      .replyOnce(404, { message: errorMessage });
    store
      .dispatch(fetchAllCategories())
      .then(() => store.getActions())
      .then((error) => {
        expect(error[1].type).toBe(FETCH_CATEGORIES_FAILURE);
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
