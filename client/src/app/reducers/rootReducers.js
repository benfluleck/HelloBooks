import {combineReducers} from 'redux';

import user from './user'
import bookReducer from './bookReducers'

export default combineReducers({user,bookReducer})
