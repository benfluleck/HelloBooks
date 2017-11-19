import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';

import userReducer from './userReducers';
import bookReducer from './bookReducers';
import imageReducer from './imageReducers';


export default combineReducers({
  userReducer, bookReducer, imageReducer, notifs: notifReducer
});
