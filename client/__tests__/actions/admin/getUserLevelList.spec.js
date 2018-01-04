import { mock, mockStore } from '../../__mocks__/mockConfig';
import {
  getUserLevelListAction,
  GET_USER_LEVEL_LIST_SUCCESS,
  GET_USER_LEVEL_LIST_FAILURE
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

describe('User Level list action', () => {
  test('should successfully return a user level list', () => {
    const store = mockStore({ userList: { } });
    mock.onGet().replyOnce(
      200,
      { userLevelList: mockItems.userLevels }
    );
    store.dispatch(getUserLevelListAction())
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_USER_LEVEL_LIST_SUCCESS);
      });
  });
  test('should returns an error when', () => {
    const store = mockStore({ });
    mock.onGet().replyOnce(404, { });
    store.dispatch(getUserLevelListAction())
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(GET_USER_LEVEL_LIST_FAILURE);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});
