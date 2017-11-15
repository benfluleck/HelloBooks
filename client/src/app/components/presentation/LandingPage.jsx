import React from 'react';
import { Row } from 'react-materialize';
import PropTypes from 'prop-types';
import WelcomeMessage from './messages/WelcomeMessage.jsx';
import Bottom from '../presentation/common/Footer.jsx';
import DisplayLandingBooks from '../container/booklist/DisplayLandingBooks.jsx';

/**
 * @description Component for Landong Page presentaion component
 * @class LandingPage
 * @param {bool} isAuthenticated
 * @param {component} WelcomeMessage
 * @param {component} DisplayLandingBooks
 */
const LandingPage = ({ isAuthenticated }) => (
  <div>
    <div className="header-wrapper">
      <Row>
        <div className="header-text">
          <h1>Welcome!.</h1>
          <h1>to Hello Books</h1>
        </div>
      </Row>
    </div>
    <Row>
      <div className="body-wrapper">
        <div className="overlay-main">
          <Row>
            <div className="overlay">
              <h3>Latest Books Available:</h3>
              <hr />
              <div>{!isAuthenticated && <WelcomeMessage />}</div>
              <DisplayLandingBooks />
            </div>
          </Row>
        </div>
      </div>
    </Row>
    <Bottom />
  </div>
);

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

export default LandingPage;
