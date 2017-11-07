import { combineReducers } from 'redux';


import userReducer from './userReducers';
import bookReducer from './bookReducers';
import { reducer as notifReducer } from 'redux-notifications';

export default combineReducers({
  userReducer, bookReducer, notifs: notifReducer
});
