import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {store} from './store/store'
import MainRoot from './mainRoot'
import setAuthorizationToken  from './utils/setAuthorizationToken'


if (localStorage.getItem('token')) {
  setAuthorizationToken(localStorage.getItem('token'));
  console.log('This has executed')
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
