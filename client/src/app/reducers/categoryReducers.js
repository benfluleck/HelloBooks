import {
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAILURE,
  EDIT_CATEGORY_SUCCESS,
  EDIT_CATEGORY_FAILURE,
  DELETE_CATEGORY_FAILURE,
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

    case ADD_CATEGORY_FAILURE:
      return { ...state, error: action.error };

    case EDIT_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: state.categoryList.map(category =>
          ((category.id !== action.category.updatedCategory.id) ?
            category : action.category.updatedCategory))
      };

    case EDIT_CATEGORY_FAILURE:
      return { ...state, error: action.error };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryList: state.categoryList
          .filter(category =>
            category.id !== action.deletedCategory.category.id)
      };

    case DELETE_CATEGORY_FAILURE:
      return { ...state, error: action.error };

    default:
      return state;
  }
}
