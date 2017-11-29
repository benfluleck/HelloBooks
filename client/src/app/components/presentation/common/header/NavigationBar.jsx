import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-materialize';
import { PropTypes } from 'prop-types';

/**
 * @description Component for Navigation
 * @class NavigationBar
 * @param {object} props
 * @extends {Component}
 * @return {object} Navigation fixed navigation bar
 */
const Navigation = (props) => {
  const links = props
    .navLinks
    .map(link => (
      <li
        key={link}
        className={props.activeLink === link
        ? 'active'
        : ''}
      >
        <NavLink to={`/${link.replace(' ', '')}`} activeClassName="active">
          {link.toUpperCase()}
        </NavLink>
      </li>
    ));
  return (
    <Navbar right fixed>
      {links}
    </Navbar>
  );
};
Navigation.propTypes = {
  activeLink: PropTypes.string,
  navLinks: PropTypes.arrayOf(PropTypes.string)
};

Navigation.defaultProps = {
  activeLink: null,
  navLinks: null
};

export default Navigation;
