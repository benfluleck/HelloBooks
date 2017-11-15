import React from 'react';
import PropTypes from 'prop-types';
import UserView from './UserView.jsx';


/**
 * component that displays user image, username and groups
 * @function SideNav
 * @param {object} props
 * @param {string} props.imageLink image URL of signed-in user
 * @param {string} props.username username of signed-in user
 * @param {string} props.email email of sign-in user
 * group Id to array of unread messages
 * @return {object} component
 */
const SideNav = ({
  imageLink,
  username = '',
  firstname = '',
  email = ''

}) =>
  (
    <ul id="slide-out" className="side-nav fixed">
      <UserView
        imageLink={imageLink}
        username={username}
        firstname={firstname}
        email={email}
      />

      <li><div className="divider" /></li>
      <li><a className="waves-effect" href="#!">Third Link With Waves</a></li>
    </ul>
  );

SideNav.propTypes = {
  imageLink: PropTypes.string,
  username: PropTypes.string,
  firstname: PropTypes.string,
  email: PropTypes.string
};

SideNav.defaultProps = {
  imageLink: null,
  username: null,
  firstname: null,
  email: null
};


export default SideNav;
