import jwtdecode from 'jwt-decode';
import throttle from 'lodash/throttle';

import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import setAuthorizationToken from '../utils/setAuthorizationToken';
// import { setCurrentUser } from '../actions/authenticate';
import rootReducer from '../reducers/rootReducers';
import {saveState, loadState} from '../utils/localSave';

const initialState = loadState();
const store = createStore(rootReducer,
   initialState,
   composeWithDevTools(applyMiddleware(createLogger(), thunk)));

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

export default store;
