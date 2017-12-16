import {
  UPLOAD_TO_CLOUD_IMAGE_SUCCESS,
  UPLOAD_TO_CLOUD_IMAGE_FAILURE
} from '../actions/actiontype';

const INITIAL_STATE = {
  body: {}
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
export default function imageReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case UPLOAD_TO_CLOUD_IMAGE_SUCCESS:
      return {
        ...state,
        body: action.response,
        url: action.response.secureUrl,
        upload: 'Success'
      };
    case UPLOAD_TO_CLOUD_IMAGE_FAILURE:
      return {
        ...state,
        error: action.response
      };
    default:
      return state;
  }
}
