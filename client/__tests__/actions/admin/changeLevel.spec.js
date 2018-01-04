import { mock, mockStore } from '../../__mocks__/mockConfig';
import {
  CHANGE_USER_LEVEL_SUCCESS,
  changeUserLevelAction,
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

describe('Change level action creator', () => {
  test(`should successfully change the user ` +
  `level for an authenticasted user`, () => {
    const store = mockStore({});
    const sucessMessage =
    'Level changed Successfully,' +
    ' New Level Diamond';
    mock.onPut().replyOnce(
      200,
      { message: sucessMessage }
    );
    store.dispatch(changeUserLevelAction(
      mockItems.userLevels.id,
      mockItems.user.id
    ))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(CHANGE_USER_LEVEL_SUCCESS);
      });
  });
  test('should return an error when no user Level is specified', () => {
    const store = mockStore({ });
    const errorMessage = 'Level does not exist';

    mock.onPut().replyOnce(404, { message: errorMessage });
    store.dispatch(changeUserLevelAction(mockItems.bookWithNoId))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
