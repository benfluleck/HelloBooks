import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavItem, Row, Icon} from 'react-materialize'
import Navigation from './NavigationBar.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



/**
 * @description Component for header and navigation
 * @class Header
 * @extends {Component}
 */
class Header extends Component {


  render() {
    let navLinks = ['books'];
    navLinks = this.props.isLoggedIn
      ? [
        'dashboard', ...navLinks,
        'history',
        'logout'
      ]
      : [
        'login', 'sign up', ...navLinks
      ];

    return (

      <header className="header">
        <Navigation
          activeLink={this.props.activeLink}
          className="right hide-on-small-and-down"
          navLinks={navLinks}/>

      </header>

    );
  }
}

Header.propTypes = {
  activeLink: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  user: PropTypes.object
};

export default(Header);
