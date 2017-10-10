import jwtdecode from 'jwt-decode';
import throttle from 'lodash/throttle';

import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
// import { persistStore, autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/auth';
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

// const store = composeWithDevTools(   applyMiddleware(createLogger(), thunk),
//  autoRehydrate() )(createStore)(rootReducer);

if (global.localStorage.token) {
  setAuthorizationToken(global.localStorage.token);
  store.dispatch(setCurrentUser(jwtdecode(global.localStorage.token)));
}

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);
// persistStore(store);

export default store;
