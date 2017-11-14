import React, {Component} from 'react';
import {Link} from 'react-router-dom'

const WelcomeMessage = () => {
  return (
    <h5>
      To Borrow any Books, Please&nbsp;
      <Link to={`/login`}>
        Login</Link>
    </h5>
  )
};
export default WelcomeMessage;
