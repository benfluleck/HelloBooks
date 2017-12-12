import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
  USER_LOG_IN_FAILURE,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE
} from '../actions/actiontype';

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false
};

/**
 * @export
 * @description this Reducer implements the authenbtication action for the user
 * @param {object} [state=INITIAL_STATE]
 * @param {object} [action={}]: action initiated
 * @returns {object} action:return the action object
 */
export default function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.data
      };

    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: action.data
      };
    case SIGNUP_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case USER_LOG_IN_FAILURE:
      return {
        ...state,
        user: null,
      };
    case USER_LOGGED_OUT:
      return {
        isAuthenticated: false,
        user: {}
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        userList: action.userList

      };
    default:
      return state;
  }
}
