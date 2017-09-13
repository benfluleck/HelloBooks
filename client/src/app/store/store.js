import {createStore, applyMiddleware} from 'redux';
import {logger} from 'redux-logger'
import thunk from 'redux-thunk'
import {composeWithDevTools}from 'redux-devtools-extension'




import reducer from '../reducers/rootReducers'




const  store = createStore(
    rootreducer, composeWithDevTools(applyMiddleware(thunk))
);




export default createStore(reducer, middleware)