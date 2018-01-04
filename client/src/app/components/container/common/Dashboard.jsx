import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

/**
   *
   * @class Dashboard
   *
   * @extends {React.Component}
   *
   * @param {object} props
   *
   * @returns {component} Dashboard
   */
export const Dashboard = (props) => {
  /**
     *
     *
     * @returns {component} DashboardWrapper
     *
     * @memberOf Dashboard
     */
  const WrappedDashboard = props.wrappedDashboard;
  return (
    <div>
      <WrappedDashboard props={props}/>
    </div>
  );
};

Dashboard.defaultProps = {
  wrappedDashboard: null
};

Dashboard.propTypes = {
  wrappedDashboard: PropTypes.func
};
/**
 * @description Handles the state of the Dashboard
 *
 * @returns {component} Dashboard
 *
 * @param {component} WrappedDashboard
 */
const GetDashboardWrapper = (WrappedDashboard) => {
  const mapStateToProps = state => ({
    user: state.userReducer.user,
    wrappedDashboard: WrappedDashboard
  });

  return connect(mapStateToProps)(Dashboard);
};

export default GetDashboardWrapper;
