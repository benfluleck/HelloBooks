import { mock, mockStore } from '../../__mocks__/mockConfig';

import borrowBooksAction from '../../../src/app/actions/borrowBooks';

import mockItems from '../../__mocks__/mockItems';

describe('Borrow books action', () => {
  test('should successfully borrow a book', () => {
    const successMessage = 'Andela One successfully loaned';
    const store = mockStore({ borrowBooksList: { } });
    mock.onPost().replyOnce(
      200,
      { message: successMessage }
    );
    store.dispatch(borrowBooksAction(mockItems.bookDetails))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toEqual('NOTIF_SEND');
      });
  });
  test(`should return an error when you try to borrow ` +
  `a book with no id`, () => {
    const errorMessage =
    "Sorry we can't find this book or all copies of this book are on loan";
    const store = mockStore({ borrowBooksList: { } });

    mock.onPost().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(borrowBooksAction(mockItems.bookWithNoId))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toEqual('NOTIF_SEND');
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
