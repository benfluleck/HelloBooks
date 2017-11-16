import {
  UPLOAD_TO_CLOUD_IMAGE_SUCCESS,
  UPLOAD_TO_CLOUD_IMAGE_FAILURE
} from '../actions/actiontype'

const INITIAL_STATE = {
  body: {}
};

export default function imageReducer(state=INITIAL_STATE,action={})
{
  switch(action.type){
    case UPLOAD_TO_CLOUD_IMAGE_SUCCESS:
    return{
      ...state,
      body: action.response,
      url: action.response.secure_url,
      upload: 'Success'
    };
    case UPLOAD_TO_CLOUD_IMAGE_FAILURE:
    return{
      ...state,
      error:error
    };
    default:
    return state;
  }

}
