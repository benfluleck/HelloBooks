import categoryReducer from '../../src/app/reducers/categoryReducers';

describe('category Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(categoryReducer(undefined, { type: 'undefinedAction' })).toEqual({
     
    });
  });
});
