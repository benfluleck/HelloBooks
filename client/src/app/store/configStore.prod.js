import jwtdecode from 'jwt-decode';
import throttle from 'lodash/throttle';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import rootReducer from '../reducers/rootReducers';
import { saveState } from '../utils/Localsave';

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  (applyMiddleware(thunk))
);


store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);


export default store;
