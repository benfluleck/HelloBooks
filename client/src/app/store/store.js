import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {loadState, saveState} from '../utils/Localsave'
import throttle from 'lodash/throttle'
import userLoggedIn from '../actions/auth'


import rootReducer from '../reducers/rootReducers'

const initialState = loadState();

export const store = createStore(rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(createLogger(), thunk)));



store.subscribe(throttle(() => {
    saveState(store.getState());
}), 1000);
