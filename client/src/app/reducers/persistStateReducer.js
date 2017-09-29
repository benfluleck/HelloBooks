import { PERSIST_STATE } from '../actions/type';

/**
 * 
 * @export
 * @param {any} [state=[]] 
 * @param {any} action 
 * @returns 
 */
export default function persistReducer(state = [], action) {
  switch (action.type) {
    case PERSIST_STATE:
      return {
        ...state,
        persistedState: action.payload
      };
    default:
      return state;
  }
}
