import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoutes = ({
  isAuthenticated,
  tokenExists,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => (isAuthenticated && tokenExists
    ? <Component{...props} />
    : <Redirect to="/login" />)} 
  />
);

UserRoutes.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  tokenExists: !!localStorage.getItem('token')
});

export default connect(mapStateToProps)(UserRoutes);
