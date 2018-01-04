import { mock, mockStore } from '../../__mocks__/mockConfig';

import { LOAN_HISTORY_FAILURE,
  LOAN_HISTORY_SUCCESS,
  loanHistoryAction
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

const offset = 0;
const limit = 8;
describe('Loan history action', () => {
  test('should successfully fetch a user\'s loan history', () => {
    const store = mockStore({ bookOperations: { } });
    mock.onGet().replyOnce(
      200,
      { bookOperations: mockItems.bookOperations }
    );
    store.dispatch(loanHistoryAction(offset, limit))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(LOAN_HISTORY_SUCCESS);
      });
  });
  test('should return an error when no loan operations is specified', () => {
    const store = mockStore({ });

    mock.onPost().replyOnce(
      404,
      { bookOperations: {} }
    );
    store.dispatch(loanHistoryAction(offset, limit))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(LOAN_HISTORY_FAILURE);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});
