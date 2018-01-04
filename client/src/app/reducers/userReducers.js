import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SIGNUP_USER_SUCCESS,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  GET_USER_LEVEL_LIST_SUCCESS,
  GET_USER_LEVEL_LIST_FAILURE,
  CHANGE_USER_LEVEL_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../actions/actionType';

const INITIAL_STATE = {
  user: {},
  isAuthenticated: false
};

/**
 *
 * @description this Reducer implements the authenbtication action for the user
 *
 * @param {object} [state=INITIAL_STATE]
 *
 * @param {object} action initiated
 *
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
      isAuthenticated: false,
      user: action.data
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

  case GET_USER_LIST_FAILURE:
    return {
      ...state,
      error: action.error
    };

  case GET_USER_LEVEL_LIST_SUCCESS:
    return {
      ...state,
      userLevels: action.userLevelList
    };

  case GET_USER_LEVEL_LIST_FAILURE:
    return {
      ...state,
      error: action.error
    };

  case CHANGE_USER_LEVEL_SUCCESS:
  {
    return {
      ...state,
      selectedUserLevel: action.userLevel,
    };
  }

  case GET_USER_SUCCESS:
    return {
      ...state,
      selectedUser: action.user
    };

  case GET_USER_FAILURE:
    return {
      ...state,
      error: action.error
    };

  default:
    return state;
  }
}
