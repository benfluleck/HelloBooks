import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoutes = ({
  isAuthenticated,
  tokenExists,
  component,
  ...rest
}) => {
  const PassedComponent = component;
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated && tokenExists ?
        <PassedComponent{...props} /> :
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
      }
    />
  );
};
UserRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  tokenExists: PropTypes.bool.isRequired,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  tokenExists: !!localStorage.getItem('token') || false,
});

export default connect(mapStateToProps)(UserRoutes);
