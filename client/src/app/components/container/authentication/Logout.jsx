import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';
import { logout } from '../../../actions/authenticate';

/**
 * handles logging a user out
 * @class Logout
 * @extends {Component}
 */
class Logout extends Component {
/**
   * @description redirects the user to the index page
   * @memberof Logout
   * @return {[type]} [description]
   */
  componentDidMount() {
    this.props.logout();
    this.props.history.push('/');
  }
  /**
   * renders component to DOM
   * @memberof Logout
   * @return {JSX} JSX reprresentation of DOM
   */
  render() {
    return (
      <Row className="center landing">
        <h1 className="">
          Logging out...
        </h1>
      </Row>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};


export default connect(null, { logout })(Logout);
