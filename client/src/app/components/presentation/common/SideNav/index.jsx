import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import UserView from './UserView';
import CategoriesSideBarList from
  '../../../container/categories/CategoriesSideBarList';


/**
 * component that displays user image, username and groups
 *
 * @function SideNav
 *
 * @param {object} props
 *
 * @param {string} props.imageLink image URL of signed-in user
 *
 * @param {string} props.username username of signed-in user
 *
 * @param {string} props.email email of sign-in user
 *
 * group Id to array of unread messages
 * @return {object} component
 */
const SideNav = ({
  props
}) =>
  (
    <ul id="slide-out" className="side-nav fixed">
      <UserView
        imageLink={props.user.profilePic}
        username={props.user.username}
        firstname={props.user.firstname}
        email={props.user.email}
        isAdmin={props.user.isAdmin}
      />
      <li><div className="divider" /></li>
      <li><NavLink to="/changepassword">Change Password</NavLink></li>
      <CategoriesSideBarList />
      <hr className="category-hr" />
    </ul>

  );


SideNav.propTypes = {
  user: PropTypes.object
};

export default SideNav;
