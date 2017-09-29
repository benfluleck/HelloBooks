import { USER_LOGGED_IN } from '../actions/type';
import { USER_LOGGED_OUT } from '../actions/type';
import { USER_SIGN_IN_FAILURE } from '../actions/type';
import { SIGNUP_USER_SUCCESS } from '../actions/type';

const INITIAL_STATE = {
  isAuthenticated: localStorage.getItem('token')
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
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
}
