import isEmpty from 'lodash/isEmpty';

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  USER_AUTH_FAILURE,
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
        isAuthenticated: false,
        user: action.user
      };
    case USER_AUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        status: 'Auth'
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
