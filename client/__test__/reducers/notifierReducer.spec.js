import notifierReducer from '../../src/app/reducers/notifierReducers';

describe('Notifier Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(notifierReducer(undefined, { type: 'undefinedAction' })).toEqual({
     
    });
  });
});
