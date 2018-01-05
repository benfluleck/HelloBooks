import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoutes = ({
  isAuthenticated,
  tokenExists,
  isAdmin,
  component,
  ...rest
}) => {
  const PassedComponent = component;
  return (
    <Route
      {...rest}
      render={props => (isAuthenticated && isAdmin && tokenExists ?
        <PassedComponent{...props} /> :
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )}
    />
  );
};

AdminRoutes.defaultProps = {
  isAdmin: false
};

AdminRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  tokenExists: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool,
  location: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  isAdmin: (state.userReducer.user) ?
    state.userReducer.user.isAdmin :
    '',
  tokenExists: !!localStorage.getItem('token')
});

export default connect(mapStateToProps)(AdminRoutes);

