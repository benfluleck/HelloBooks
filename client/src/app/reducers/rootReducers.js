import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';

import userReducer from './userReducers';
import bookReducer from './bookReducers';
import imageReducer from './imageReducers';
import notifierReducer from './notifierReducers';


export default combineReducers({
  notifierReducer,
  userReducer,
  bookReducer,
  imageReducer,
  notifs: notifReducer
});
