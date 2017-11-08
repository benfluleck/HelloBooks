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
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  // if (!isAuthenticated) {
  //   return <Preloader size='big' className="center-align"/>
  // }
  return (
    <Route
      {...rest}
      render={(props) => isAuthenticated
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
    isAuthenticated: !!state.userReducer.isAuthenticated
  };
}

export default connect(mapStateToProps)(UserRoutes);
