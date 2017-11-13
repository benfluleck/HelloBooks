import React from 'react';
import {Row, Preloader} from 'react-materialize';
import PropTypes from 'prop-types';
import {Book} from '../presentation/common/Book/DisplayBook.jsx';
import WelcomeMessage from './messages/WelcomeMessage.jsx'
import {Bottom} from '../presentation/common/Footer.jsx'
import DisplayLandingBooks from '../container/booklist/DisplayLandingBooks.jsx';

/**
 * @description Component for Welcome Page for all users
 * @class Landing Page
 * @extends {Component}
 */
class LandingPage extends React.Component {
  constructor(props) {
    super(props);

  }
  /**
   * render Landing page component
   * @method render
   * @member LandingPage
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <div className='header-wrapper'>
          <Row>
            <div className='header-text'>
              <h1>
                Welcome!.</h1>
              <h1>to Hello Books</h1>
            </div>
          </Row>
        </div>
        <Row>
          <div className='body-wrapper'>
            <div className='overlay-main'>
              <Row>
                <div className='overlay'>
                  <h3>Latest Books Available:
                  </h3>
                  <hr/>
                  <div>
                  {!this.props.isAuthenticated && <WelcomeMessage/>}
                  </div>
                  <p>Click a book for a look at the Author</p>
                 <DisplayLandingBooks/>
                </div>
              </Row>
            </div>
          </div>
        </Row>
        <Bottom/>
      </div>
    );
  }
}

export default LandingPage;
