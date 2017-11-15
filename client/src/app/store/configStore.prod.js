import jwtdecode from 'jwt-decode';
import throttle from 'lodash/throttle';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducers';
import { saveState, loadState } from '../utils/localSave';

const initialState = loadState();
const store = createStore(
  rootReducer,
  initialState,
  (applyMiddleware(thunk))
);


store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);


export default store;
