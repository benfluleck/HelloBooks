import { combineReducers } from 'redux';

import { routerReducer } from 'react-router-redux';
import user from './user';
import bookReducer from './bookReducers';
import persistReducer from './persistStateReducer';

export default combineReducers({
  user, bookReducer, persistReducer, routerReducer
});
