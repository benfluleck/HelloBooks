import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools}from 'redux-devtools-extension'




import rootreducer from '../reducers/rootReducers'


export const  store = createStore(
    rootreducer, composeWithDevTools(applyMiddleware(thunk))
);




