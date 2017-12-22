import {
  ADD_CATEGORY_SUCCESS,
  EDIT_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from '../actions/actionType';

const InitialBooksState = {
};

/**
 *
 * @export
 * @param {any} [state=INITIAL_STATE]
 *
 * @param {any} [action={}]
 *
 * @param {object}  error
 *
 * @returns {object}  state
 */
export default function categoryReducer(
  state = InitialBooksState,
  action = {}
) {
  switch (action.type) {
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categoryList: action.categories.categories };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, error: action.error };

    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: [...state.categoryList,
          action.category.category
        ]
      };
    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: state.categoryList.map(category =>
          ((category.id !== action.category.updatedCategory.id) ?
            category : action.category.updatedCategory))
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: state.categoryList
          .filter(category =>
            category.id !== action.deletedCategory.category.id)
      };

    default:
      return state;
  }
}
