import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
// import throttle from 'lodash/throttle';
// import { loadState, saveState } from '../utils/Localsave';
// import userLoggedIn from '../actions/auth';


import rootReducer from '../reducers/rootReducers';


// store.subscribe(throttle(() => {
//   saveState(store.getState());
// }), 1000);
// export default const store = createStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(createLogger(), thunk),
//   autoRehydrate()
// )
// );

const store = composeWithDevTools(
  applyMiddleware(createLogger(), thunk),
  autoRehydrate()
)(createStore)(rootReducer);


persistStore(store);

export default store;
