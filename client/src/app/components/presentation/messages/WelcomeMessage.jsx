import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * @description Component for Welcome Mesage
 * @class WelcomeMessage
 */
const WelcomeMessage = () => (
  <h5>
To Borrow any Books, Please&nbsp;
<NavLink to="/login">Login</NavLink>
  </h5>
);
export default WelcomeMessage;
