import jwtdecode from 'jwt-decode';
import throttle from 'lodash/throttle';

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/authenticate';
import rootReducer from '../reducers/rootReducers';
import { loadState, saveState } from '../utils/Localsave';

const initialState = loadState;
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(
    createLogger(),
    thunk
  ))
);



if (localStorage.token) {
  setAuthorizationToken(localStorage.token);
  store.dispatch(setCurrentUser(jwtdecode(localStorage.token)));
}

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);


export default store;
