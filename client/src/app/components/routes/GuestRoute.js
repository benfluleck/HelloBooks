import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux'

/**
 *
 * @param {*}
 */

const UserRoute = ({

  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (

    <Route
      {...rest}
      render={props => !isAuthenticated
      ? <Component{...props}/>
      : <Redirect to='/'/>}/>

  );

};

UserRoute.PropTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {

  return {
    isAuthenticated: !!state.user.user
  };

}

export default connect(mapStateToProps)(UserRoute);
