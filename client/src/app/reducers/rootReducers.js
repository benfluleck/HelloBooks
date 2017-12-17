import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';

import userReducer from './userReducers';
import bookReducer from './bookReducers';
import imageReducer from './imageReducers';
import notifierReducer from './notifierReducers';
import categoryReducer from './categoryReducers';


export default combineReducers({
  notifierReducer,
  userReducer,
  bookReducer,
  imageReducer,
  categoryReducer,
  notifs: notifReducer
});
