import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavItem, Row, Icon} from 'react-materialize'
import Navigation from './NavigationBar';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

/*
eslint-disable
 */


/**
 * Component for header and navigation
 * @class Header
 * @extends {Component}
 */
class Header extends Component {
  componentDidMount() {

    document.addEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    const top = document.documentElement.scrollTop;
    const change = document.getElementById('nav-change');
    if (top > 10) {
      if (change.classList)
        change.classList.remove('transparent');
      }
    else {
      change
        .classList
        .add('transparent');
    }
  }
  componentWillUnmount() {
    document
      .documentElement
      .removeEventListener('scroll', this.handleScroll);
  }

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
            />
          />
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
