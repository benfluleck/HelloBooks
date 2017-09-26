import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

/*
*
*Routes for Authenticated users
*/
const UserRoute = ({
  isAuthenticated,
  history,
  component: Component,
  ...rest
}) => {

  return (

    <Route
      history={browserHistory}
      {...rest}
      render={(props) => isAuthenticated
      ? <Component{...props}/>
      : <Redirect to='/'/>}/>

  );

};

UserRoute.PropTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  name: PropTypes.string

};

const mapStateToProps = (state) => {
  // if (!state.user.user.token || state.user.user.token === "") { //if there is
  // no token, dont bother     return ; } else {

  return {
    isAuthenticated: !!state.user.user
  };
  // }
}

export default connect(mapStateToProps)(UserRoute);
