import isEmpty from 'lodash/isEmpty';

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_SIGN_IN_FAILURE,
  SET_CURRENT_USER,
  SIGNUP_USER_SUCCESS } from '../actions/type';

const INITIAL_STATE = {
  // isAuthenticated: null,
  user: {}
};


/**
 *
 *
 * @export
 * @param {any} [state=INITIAL_STATE]
 * @param {any} [action={}]
 * @returns
 */
export default function user(state = INITIAL_STATE, action = {}) {
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
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    case USER_SIGN_IN_FAILURE:
      error = action.error.data.message;
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        status: 'signup',
        error
      };
    case USER_LOGGED_OUT:
      return {
        INITIAL_STATE,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
