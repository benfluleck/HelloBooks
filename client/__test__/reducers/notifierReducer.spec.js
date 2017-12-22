import notifierReducer from '../../src/app/reducers/notifierReducers';

import { getNotificationSuccess,
  getNotificationFailure }
  from '../../src/app/actions/admin/getAdminNotifications';

let action;
let newState;

const initialState = {

  notifications: {}
};

const notifications = {
  notifications: [
    {
      id: 1,
      userId: 1,
      bookId: 14,
      action: 'Book Returned'
    },
    {
      id: 2,
      userId: 2,
      bookId: 14,
      action: 'Book Returned'
    }
  ],
  pagination: {
    pageSize: 1, pageNumber: 1, pageCount: 1, totalCount: 1
  }
};


describe('Notifier Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(notifierReducer(undefined, { type: 'undefinedAction' })).toEqual({
    });
  });

  it('should handle action to GET_NOTIFICATIONS_SUCCESS', () => {
    action = getNotificationSuccess(notifications);
    newState = notifierReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.notifications).toEqual(notifications);
  });

  it('should handle action to GET_NOTIFICATIONS_FAILURE', () => {
    action = getNotificationFailure();
    newState = notifierReducer(initialState, action);
    expect(newState.error).toEqual(undefined);
  });
});
