import { mock, mockStore } from '../../__mocks__/mockConfig';
import {
  getAdminNotificationAction,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_FAILURE
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';

describe('Admin Notifications action creator', () => {
  test('should successfully list the admin notifications', () => {
    const store = mockStore({ notifications: { } });
    mock.onGet().replyOnce(
      200,
      { notifications: mockItems.notification }
    );
    store.dispatch(getAdminNotificationAction(0, 6))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toBe(GET_NOTIFICATIONS_SUCCESS);
      });
  });
  test('should return an error when there are no notifications', () => {
    const store = mockStore({ notifications: { } });

    mock.onGet().replyOnce(404, { });
    store.dispatch(getAdminNotificationAction(0, 6))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toBe(GET_NOTIFICATIONS_FAILURE);
        expect(error[0].error.error.response.status).toEqual(404);
      });
  });
});
