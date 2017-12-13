import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoutes = ({
  isAuthenticated,
  tokenExists,
  isAdmin,
  component : Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAuthenticated && isAdmin && tokenExists
    ? <Component{...props} />
    : <Redirect to="/login" />)}
  />
);

AdminRoutes.defaultProps = {
  isAdmin: false
};

AdminRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tokenExists: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  isAdmin: (state.userReducer.user)
    ? state.userReducer.user.isAdmin
    : '',
  tokenExists: !!localStorage.getItem('token')
});

export default connect(mapStateToProps)(AdminRoutes);

