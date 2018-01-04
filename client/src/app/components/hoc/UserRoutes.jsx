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
        <Redirect to="/login" />
      )
      }
    />
  );
};
UserRoutes.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  tokenExists: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  tokenExists: !!localStorage.getItem('token'),
  // isAdmin: (state.userReducer.user)
  //   ? state.userReducer.user.isAdmin
  //   : '',
});

export default connect(mapStateToProps)(UserRoutes);
