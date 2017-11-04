import { combineReducers } from 'redux';


import user from './user';
import bookReducer from './bookReducers';
import { reducer as notifReducer } from 'redux-notifications';
// import persistReducer from './persistStateReducer';

export default combineReducers({
  user, bookReducer, notifs: notifReducer
});
