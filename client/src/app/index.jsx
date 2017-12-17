import React from 'react';
import { render } from 'react-dom';

import { Notifs } from 'redux-notifications';
import { Provider } from 'react-redux';
import store from './store/configStore';
import MainRoot from './mainRoot.jsx';
import setAuthorizationToken from './utils/setAuthorizationToken';

if (localStorage.getItem('token')) {
  setAuthorizationToken(localStorage.getItem('token'));
}
/**
 *
 * @class App
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
      <Notifs />
    </div>
  </Provider>,
  window.document.getElementById('app')
);
