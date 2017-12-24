import { mock, mockStore } from '../../__mocks__/mockConfig';

import { addNewCategory,
  ADD_CATEGORY_SUCCESS,
  deleteCategoryAction,
  editCategoryAction,
  DELETE_CATEGORY_SUCCESS,
  EDIT_CATEGORY_SUCCESS
} from '../../../src/app/actions/index';

import mockItems from '../../__mocks__/mockItems';


describe('addCategory action creator', () => {
  test(
    `dispatches an action with type ADD_CATEGORY_SUCCESS
    when the api request is successfully executed`,
    () => {
      const store = mockStore({ category: {} });
      const responseBody = {
        message: 'Category added!, Test Category',
        user: 'admin',
        category: {
          id: 15,
          categoryName: 'Test Category',
          updatedAt: '2017-12-22T18:04:20.985Z',
          createdAt: '2017-12-22T18:04:20.985Z',
          deletedAt: null

        }
      };

      mock.onPost().replyOnce(201, {
        message: responseBody.message
      });

      store.dispatch(addNewCategory(responseBody.categoryName))
        .then(() => store.getActions())
        .then((actions) => {
          expect(actions[0].type).toBe(ADD_CATEGORY_SUCCESS);
        });
    }
  );

  test(
    `dispatch an action with the type ADD CATEGORY FAILURE
    when api request fails`,
    () => {
      const store = mockStore({ category: {} });
      const message = 'Category already Exists';

      mock.onPost().replyOnce(409, { message });

      store.dispatch(addNewCategory('Test Category'))
        .then(() => store.getActions())
        .then((error) => {
          expect(error[0].payload.message).toEqual(message);
        });
    }
  );
});

describe('edit Category action creator', () => {
  test('successfully edits a category in the library', () => {
    const store = mockStore({ category: { } });
    const sucessMessage =
    'Physics has been updated!';
    mock.onPut().replyOnce(
      200,
      { message: sucessMessage }
    );
    store.dispatch(editCategoryAction(
      { categoryName: 'Physics' },
      mockItems.category.id
    ))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(EDIT_CATEGORY_SUCCESS);
      });
  });
  test('should return an error when a category in invalid', () => {
    const store = mockStore({ category: {} });
    const errorMessage = 'Category Name is Invalid';

    mock.onPut().replyOnce(404, { message: errorMessage });
    store.dispatch(editCategoryAction(''))
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});

describe('deleteBook action creator', () => {
  test('successfully deletes a book to library', () => {
    const store = mockStore({ category: {} });
    const sucessMessage = 'This category has been deleted';
    mock.onDelete().replyOnce(
      200,
      { message: sucessMessage }
    );
    store.dispatch(deleteCategoryAction(mockItems.category.id))
      .then(() => store.getActions())
      .then((actions) => {
        expect(actions.length).toBe(2);
        expect(actions[0].type).toBe(DELETE_CATEGORY_SUCCESS);
      });
  });
  test('should return an error when' +
    'a category without an id is being deleted', () => {
    const store = mockStore({ categoy: {} });
    const errorMessage = 'Category does not exist';
    mock.onDelete().replyOnce(404, { message: errorMessage });
    store.dispatch(deleteCategoryAction())
      .then(() => store.getActions())
      .then((error) => {
        expect(error[0].payload.message).toEqual(errorMessage);
      });
  });
});
