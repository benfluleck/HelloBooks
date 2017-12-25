import { mock, mockStore } from '../../__mocks__/mockConfig';

import { returnBookAction,
  RETURN_BOOKS_SUCCESS
} from '../../../src/app/actions/index';


import mockItems from '../../__mocks__/mockItems';

describe('Return book action', () => {
  test('should successfully return a book', () => {
    const successMessage = 'Andela One successfully returned';
    const store = mockStore({ borrowBooksList: { } });
    mock.onPut().replyOnce(
      200,
      { message: successMessage }
    );
    store.dispatch(returnBookAction(mockItems.bookDetails))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(RETURN_BOOKS_SUCCESS);
      });
  });
  test('should return an error when you try to return'
  + 'a book with no id', () => {
    const errorMessage = 'You did not borrow this book';
    const store = mockStore({ borrowBooksList: { } });

    mock.onPut().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(returnBookAction(mockItems.bookWithNoId))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toEqual('NOTIF_SEND');
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
