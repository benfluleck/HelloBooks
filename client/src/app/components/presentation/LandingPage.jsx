import React from 'react';
import { Row } from 'react-materialize';
import PropTypes from 'prop-types';
import WelcomeMessage from './messages/WelcomeMessage';
import Bottom from '../presentation/common/Footer';
import DisplayRecentBooks from '../container/booklist/DisplayRecentBooks';

/**
 * @description Component for Landong Page presentaion component
 *
 * @class LandingPage
 *
 * @param {bool} isAuthenticated
 */
const LandingPage = ({ isAuthenticated }) => (
  <div>
    <div className="header-wrapper">
      <Row>
        <div className="header-text">
          <h1>Welcome to Hello Books! </h1>
        </div>
      </Row>
    </div>
    <Row>
      <div className="body-wrapper">
        <div className="overlay-main">
          <Row>
            <div className="overlay">
              Latest Books Available:
              <hr />
              <div>{!isAuthenticated && <WelcomeMessage />}</div>
              <DisplayRecentBooks />
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
