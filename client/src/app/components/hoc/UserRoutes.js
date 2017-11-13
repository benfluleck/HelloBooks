import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {Preloader} from 'react-materialize';

/*
*
*Routes for Authenticated users
*/
const UserRoutes = ({
  isAuthenticated, tokenExists,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated && tokenExists
      ? <Component{...props}/>
      : <Redirect to='/login'/>}/>
  );

};

UserRoutes.PropTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: !!state.userReducer.isAuthenticated,
    tokenExists: !!localStorage.getItem('token')
  };
}

export default connect(mapStateToProps)(UserRoutes);
