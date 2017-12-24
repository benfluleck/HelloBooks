import { mock, mockStore } from '../../__mocks__/mockConfig';
import {
  getUserListAction,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

describe('User list action', () => {
  test('successfully returns a user list', () => {
    const store = mockStore({ userList: { } });
    mock.onGet().replyOnce(
      200,
      { userList: mockItems.userList }
    );
    store.dispatch(getUserListAction(0, 5))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_USER_LIST_SUCCESS);
      });
  });
  test('should returns an error when ', () => {
    const store = mockStore({ });
    mock.onGet().replyOnce(404, { });
    store.dispatch(getUserListAction())
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(GET_USER_LIST_FAILURE);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});
