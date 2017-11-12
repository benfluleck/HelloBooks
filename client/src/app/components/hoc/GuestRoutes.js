import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

/*
*
*Routes for Authenticated users
*/
const GuestRoutes = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => !isAuthenticated
      ? <Component{...props}/>
      : <Redirect to='/login'/>}/>

  );

};

GuestRoutes.PropTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.userReducer.isAuthenticated
  };
}

export default connect(mapStateToProps)(GuestRoutes);
