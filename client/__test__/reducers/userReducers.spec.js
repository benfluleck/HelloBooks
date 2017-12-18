import userReducer from '../../src/app/reducers/userReducers';

describe('User Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(userReducer(undefined, { type: 'undefinedAction' })).toEqual({
        user: {},
  isAuthenticated: false
    });
  });
  // it('should return initial state for unknown action types', () => {
  //   action = { type: null };
  //   newState = userReducer(initialState.bookReducer, action);
  //   expect(newState).toEqual(initialState.bookReducer);
  // });
});
