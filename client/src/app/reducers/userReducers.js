import isEmpty from 'lodash/isEmpty';

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SIGN_UP_FAILURE,
  SET_CURRENT_USER,
  SIGNUP_USER_SUCCESS } from '../actions/actiontype';

const INITIAL_STATE = {
user:{},
isAuthenticated: false
};


/**
 *
 *
 * @export
 * @param {any} [state=INITIAL_STATE]
 * @param {any} [action={}]
 * @returns
 */
export default function userReducer (state = INITIAL_STATE, action = {}) {
  let error;
  switch (action.type) {
    case USER_LOGGED_IN:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user
      };
    // case SET_CURRENT_USER:
    //   return {
    //     ...state,
    //     isAuthenticated: !isEmpty(action.user),
    //     user: action.user
    //   };
    case USER_SIGN_UP_FAILURE:
      error = action.error.data.message;
      return {
        ...state,
        user: null,
        status: 'signUp',
        error
      };
    case USER_LOGGED_OUT:
      return {
        isAuthenticated: false,
        user:{}
      };
    default:
      return state;
  }
}
