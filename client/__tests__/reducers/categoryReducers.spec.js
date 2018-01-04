import categoryReducer from '../../src/app/reducers/categoryReducers';

import { fetchCategoriesSuccess,
  fetchCategoriesFailure } from
  '../../src/app/actions/fetchCategories';

import { addCategorySuccess } from '../../src/app/actions/admin/addCategory';
import { editCategorySuccess } from '../../src/app/actions/admin/editCategory';
import {
  deleteCategorySuccess } from '../../src/app/actions/admin/deleteCategory';

const categories = {
  categories: [

    { id: 1, categoryName: 'Action' },
    { id: 2, categoryName: 'Thriller' },
    { id: 3, categoryName: 'Horror' },
  ]
};

let action;
let newState;

const initialState = {
  categoryList: []
};

describe('Category Reducer', () => {
  it(' should return Initial state for undefined prop types', () => {
    expect(categoryReducer(undefined, { type: 'undefinedAction' })).toEqual({
    });
  });
  it('should handle action to FETCH_CATEGORIES_SUCCESS', () => {
    action = fetchCategoriesSuccess(categories);
    newState = categoryReducer(initialState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.categoryList).toEqual(categories.categories);
    expect(newState.categoryList).toHaveLength(3);
  });

  it('should handle action to ADD_CATEGORY_SUCCESS', () => {
    const category =
     {
       message: 'Category added!, EKUNDAYO',
       category: { id: 3, categoryName: 'Andela' }
     };
    action = addCategorySuccess(category);
    newState = categoryReducer(newState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.categoryList).toHaveLength(4);
  });

  it('should handle action to EDIT_CATEGORY_SUCCESS', () => {
    const category =
     {
       message: 'Category Modified!',
       updatedCategory: { id: 3, categoryName: 'Boy' }
     };
    action = editCategorySuccess(category);
    newState = categoryReducer(newState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.categoryList[3]).toEqual(category.updatedCategory);
  });

  it('should handle action to DELETE_CATEGORY_SUCCESS', () => {
    const Category = {
      deleteCategory:
      { category: { id: 3, categoryName: 'Boy' } }
    };
    action = deleteCategorySuccess(Category.deleteCategory);
    newState = categoryReducer(newState, action);
    expect(newState).not.toEqual(initialState, action);
    expect(newState.categoryList).toHaveLength(2);
  });

  it('should handle action to FETCH_CATEGORIES_FAILURE', () => {
    action = fetchCategoriesFailure();
    newState = categoryReducer(newState, action);
    expect(newState.error).toEqual(undefined);
  });
});
