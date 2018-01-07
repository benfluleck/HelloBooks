import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import { Notifs } from 'redux-notifications';
import { Provider } from 'react-redux';
import store from './store/configStore';
import MainRoot from './MainRoot';
import setAuthorizationToken from './utils/setAuthorizationToken';
import { logout } from './actions/authenticate';

if (localStorage.getItem('token')) {
  setAuthorizationToken(localStorage.getItem('token'));
}

axios
  .interceptors
  .response
  .use((response) => response, (error) => {
    if (error.response.status === 401 || (error.response.status === 403)) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  });


/**
 *
 * App class, renders the default page
 *
 * @extends {React.Component}
 *
 * @returns {object} Component
 */
const App = () => <MainRoot />;

export default App;

render(
  <Provider store={store}>
    <div>
      <App />
      <Notifs className = "notif"/>
    </div>
  </Provider>,
  window.document.getElementById('app')
);
