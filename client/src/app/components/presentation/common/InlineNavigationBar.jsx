import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';

/**
 * @description Component for Inline Navigation Bar
 * @class NavigationBar
 * @extends {Component}
 * @return {object} Inline Navigation bar
 */
const InlineNavigationBar = (props) => {
  const links = props.navLinks.map(link =>
    (
      <li key={link}
        className={props.activeLink === link ? 'active' : ''}>
        <NavLink to={`${link.replace(' ', '')}`}
          activeClassName="active">
          {link.toUpperCase()}
        </NavLink>
      </li>
    )
  );
  return (
    <div className="internal-navbar">
        <ul className="right">
            {links}
        </ul>
    </div>
  );
};



export default InlineNavigationBar;
