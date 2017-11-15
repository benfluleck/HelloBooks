import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './NavigationBar.jsx';


/**
 * @description Component for header and navigation
 * @class Header
 * @param {bool} isAuthenticated
 * @param {bool} tokenExists
 * @param {string} activeLink
 * @extends {Component}
 */
const Header = ({ isAuthenticated, tokenExists, activeLink }) => {
/**
   * render Navigation Bar
   * @method render
   * @member Header
   * @returns {object} component
   */

  let navLinks = ['dashboard'];
  navLinks = isAuthenticated && tokenExists
    ? [
      ...navLinks,
      'api docs', 'logout'
    ]
    : [
      'login', 'sign up', ...navLinks
    ];
  return (
    <header className="header">
      <Navigation
        activeLink={activeLink}
        className="right hide-on-small-and-down"
        navLinks={navLinks}
      />
    </header>

  );
};

Header.propTypes = {
  activeLink: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  tokenExists: PropTypes.bool
};

Header.defaultProps = {
  activeLink: null,
  isAuthenticated: false,
  tokenExists: false
};

export default(Header);
