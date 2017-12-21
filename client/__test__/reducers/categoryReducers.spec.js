import categoryReducer from '../../src/app/reducers/categoryReducers';

import { fetchBooksCategoriesSuccess } from
  '../../src/app/actions/fetchCategories';


describe('category Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(categoryReducer(undefined, { type: 'undefinedAction' })).toEqual({
     
    });
  });
});
