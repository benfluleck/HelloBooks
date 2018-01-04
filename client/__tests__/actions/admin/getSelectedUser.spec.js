import { mock, mockStore } from '../../__mocks__/mockConfig';
import {
  getSelectedUser,
  GET_USER_SUCCESS,
  GET_USER_FAILURE
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

describe('Get selected user action creator', () => {
  test('should successfully return a selected user', () => {
    const store = mockStore({ user: { } });
    mock.onGet().replyOnce(
      200,
      { userId: mockItems.user.id }
    );
    store.dispatch(getSelectedUser(mockItems.user.id))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_USER_SUCCESS);
      });
  });
  test('should return an error when no user Id is specified', () => {
    const store = mockStore({ });
    mock.onGet().replyOnce(404, { });
    store.dispatch(getSelectedUser())
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(GET_USER_FAILURE);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});
