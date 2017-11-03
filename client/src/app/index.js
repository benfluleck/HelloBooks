import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import store from './store/store'
import MainRoot from './mainRoot.jsx'
import setAuthorizationToken  from './utils/setAuthorizationToken'



if (localStorage.getItem('token')) {
  setAuthorizationToken(localStorage.getItem('token'));

}

class App extends React.Component {

  render() {
    return (<MainRoot/>)
  }
}

render(
  <Provider store={store}>
  <App/>
</Provider>, window.document.getElementById('app'))
