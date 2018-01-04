import { mock, mockStore } from '../../__mocks__/mockConfig';

import { USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SIGNUP_USER_SUCCESS,
  signup,
  login,
  logout
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';


describe('signup action creator', () => {
  test('successfully signup by authenticated users', () => {
    const store = mockStore({ user: { } });
    const successMessage = `bennytest has been added to the library, ` +
    `Please Login, you will be only required to do this once`;
    mock.onPost().replyOnce(
      201,
      { message: successMessage }
    );
    store.dispatch(signup(mockItems.user))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(SIGNUP_USER_SUCCESS);
      });
  });
  test('should return an error when user details are empty', () => {
    const store = mockStore({ user: { } });
    const errorMessage = 'This username is already in use';

    mock.onPost().replyOnce(409, { message: errorMessage });
    store.dispatch(signup(mockItems.user))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});


describe('login action creator', () => {
  test('should successfully login an authenticated users', () => {
    const store = mockStore({ user: { } });
    const successMessage = 'You are now logged in as bennytest';
    mock.onPost().replyOnce(
      200,
      { message: successMessage }
    );
    store.dispatch(login(mockItems.userToSignIn))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[1].type).toBe(USER_LOGGED_IN);
        expect(actions[0].payload.message).toEqual(successMessage);
      });
  });
  test('should return an error when user details are empty', () => {
    const store = mockStore({ user: { } });
    const errorMessage = 'Wrong credentials';

    mock.onPost().replyOnce(400, { message: errorMessage });
    store.dispatch(login())
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});

describe('logout action creator', () => {
  test('should successfully logout users', (done) => {
    const store = mockStore({});
    const expectedActions = [{ type: USER_LOGGED_OUT, user: undefined }];
    store.dispatch(logout());
    expect(store.getActions()).toEqual(expectedActions);
    done();
  });
});
