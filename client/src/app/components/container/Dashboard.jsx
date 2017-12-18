import React from 'react';
import { connect } from 'react-redux';


/**
 * @returns {component} Dashboard
 *
 * @param {component} DashboardWrapper
 */
const getDashboardWrapper = (DashboardWrapper) => {
  /**
   *
   * @class Dashboard
   *
   * @extends {React.PureComponent}
   *
   * @param {object} props
   *
   * @returns {component} Dashboard
   */
  class Dashboard extends React.PureComponent {
    /**
     *
     *
     * @returns {component} DashboardWrapper
     *
     * @memberOf Dashboard
     */
    render() {
      return <DashboardWrapper props={this.props} />;
    }
  }


  Dashboard.defaultProps = {
    username: '',
    firstname: '',
    email: '',
  };


  const mapStateToProps = state => ({
    username: state.userReducer.user.username,
    firstname: state.userReducer.user.firstname,
    email: state.userReducer.user.email,
    profilePic: state.userReducer.user.profilePic,
    isAdmin: state.userReducer.user.isAdmin
  });

  return connect(mapStateToProps)(Dashboard);
};

export default getDashboardWrapper;
