import { mock, mockStore } from '../../__mocks__/mockConfig';

import { searchAllBooks,
  SEARCH_BOOKS_SUCCESS
} from '../../../src/app/actions/index';


import mockItems from '../../__mocks__/mockItems';

describe('Search All Books action', () => {
  test('should successfully rsearch all books', () => {
    const store = mockStore({ allBooksList: { } });
    mock.onGet().replyOnce(
      200,
      { booksFound: mockItems.booksFound }
    );
    store.dispatch(searchAllBooks('Cap'))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(SEARCH_BOOKS_SUCCESS);
      });
  });
  test(`should return an error when there are no results` +
  `matching the current criteria`, () => {
    const errorMessage = 'No books matching the cirrent search criteria';
    const store = mockStore({ allBooksList: { } });

    mock.onGet().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(searchAllBooks('adsdsd'))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toEqual('NOTIF_SEND');
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
