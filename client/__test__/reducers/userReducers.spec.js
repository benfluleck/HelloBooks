import userReducer from '../../src/app/reducers/userReducers';


describe('User Reducer', () => {
  it(' has a default state', () => {
    expect(userReducer(undefined, { type: 'undefinedAction' })).toEqual({

    });
  });
});
