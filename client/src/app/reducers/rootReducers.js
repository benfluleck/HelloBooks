import { combineReducers } from 'redux';
import { reducer as notifReducer } from 'redux-notifications';

import userReducer from './userReducers';
import bookReducer from './bookReducers';


export default combineReducers({
  userReducer, bookReducer, notifs: notifReducer
});
