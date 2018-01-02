import {
  GET_NOTIFICATIONS_FAILURE,
  GET_NOTIFICATIONS_SUCCESS
} from '../actions/actionType';

const INITIAL_STATE = {
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
export default function notifierReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case GET_NOTIFICATIONS_SUCCESS:
    return {
      ...state,
      notifications: action.data
    };

  case GET_NOTIFICATIONS_FAILURE:
    return {
      ...state,
      error: action.error
    };

  default:
    return state;
  }
}
