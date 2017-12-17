import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { signup } from '../../../actions/authenticate';
import SignUpForm from '../../presentation/authentication/SignUpPage.jsx';

/**
 * handles registartion of users
 *
 * @param {object} data
 *
 * @class SignUpPage
 *
 * @extends {Component}
 */
class SignUpPage extends Component {
  submit = (data) => {
    this
      .props
      .signup(data)
      .then((res) => {
        if (res.statusText === 'Created') {
          this
            .props
            .history
            .push('/login');
        } else {
          Materialize.toast('Please sign in again', 3000);
        }
      })
      .catch(() => {});
  }
  /**
 * handles signing in of users
 *
 * @class SignInPage
 *
 * @extends {React.Component}
 */
  render() {
    return (<SignUpForm submit={this.submit} />);
  }
}

SignUpPage.propTypes = {
  signup: PropTypes.func.isRequired

};

export default connect(null, { signup })(SignUpPage);
