import React, {Component} from 'react'
import {Message} from 'semantic-ui-react';

const WelcomeMessage = () => {
  return (
    <h5>
      To Borrow any Books, Please
      <a href='/login'>
        Login</a>
    </h5>
  )
};
export default WelcomeMessage;
