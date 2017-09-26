import {USER_LOGGED_IN} from '../actions/type'
import {USER_LOGGED_OUT} from '../actions/type'
import {USER_SIGN_IN_FAILURE} from '../actions/type'
import {SIGNUP_USER_SUCCESS} from '../actions/type'



const INITIAL_STATE = {};


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
        user: action.user
      };
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      };

    case USER_SIGN_IN_FAILURE:
      error = action.error.data.message;
        
      return {
        ...state,
        user: null,
        status: 'signup',
        error: error
      };
    case USER_LOGGED_OUT:

      return {
        ...state,
        user: null
      };
    default:
      return state;

  }
}
