import { mock, mockStore } from '../../__mocks__/mockConfig';


import changePasswordAction from '../../../src/app/actions/changePassword';

import mockItems from '../../__mocks__/mockItems';

describe('Change level action creator', () => {
  test('should successfully change an authenticated\'s password', () => {
    const store = mockStore({});
    const sucessMessage =
    'bennytest your password has been updated';
    mock.onPut().replyOnce(
      200,
      { message: sucessMessage }
    );
    store.dispatch(changePasswordAction(
      mockItems.userToSignIn.password,
      mockItems.userToSignIn.newPassword
    ))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(1);
        expect(actions[0].type).toEqual('NOTIF_SEND');
      });
  });
  test(`should return an error when you specify the old` +
  `password as the new password`, () => {
    const errorMessage =
    "Sorry we can't find this book or all copies of this book are on loan";
    const store = mockStore({ });

    mock.onPut().replyOnce(
      404,
      { message: errorMessage }
    );
    store.dispatch(changePasswordAction(
      mockItems.userToSignIn.password,
      mockItems.userToSignIn.password
    ))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].type).toEqual('NOTIF_SEND');
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
