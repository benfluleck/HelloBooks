import React from 'react';
import { render } from 'react-dom';

import { Notifs } from 'redux-notifications';
import { Provider } from 'react-redux';
import store from './store/configStore';
import MainRoot from './MainRoot';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.getItem('token')) {
  setAuthorizationToken(localStorage.getItem('token'));
}
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
