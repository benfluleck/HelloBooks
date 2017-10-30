import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, NavItem } from 'react-materialize';


const Navigation = (props) => {
  const links = props.navLinks.map(link =>
    (
      <li key={link}
        className={props.activeLink === link ? 'active' : ''}>
        <NavLink to={`/${link.replace(' ', '')}`}
          activeClassName="active"
        >
          {link.toUpperCase()}
        </NavLink>
      </li>
    )
  );
  return (
    <Navbar right id="nav-change" className='transparent' fixed={true}>
      {links}
    </Navbar>
  );
};



export default Navigation;
