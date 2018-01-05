import React from 'react';
import { PropTypes } from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';


const GuestRoutes = ({
  isAuthenticated,
  tokenExists,
  component,
  ...rest
}) => {
  const PassedComponent = component;
  return (
    <Route
      {...rest}
      render={
        props => (!isAuthenticated || !tokenExists ?
          <PassedComponent{...props} /> :
          <Redirect to={{
            pathname: '/dashboard',
            state: { from: props.location }
          }} />
        )
      }
    />
  );
};

GuestRoutes.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  tokenExists: PropTypes.bool,
  location: PropTypes.object
};

const mapStateToProps = state =>
  ({
    isAuthenticated: state.userReducer.isAuthenticated,
    tokenExists: !!localStorage.getItem('token')
  });

export default connect(mapStateToProps)(GuestRoutes);
