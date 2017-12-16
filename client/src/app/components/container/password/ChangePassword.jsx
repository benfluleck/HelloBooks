import React, { Component } from 'react';
import { Input, Col, Row, Icon, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { validatePasswordInput } from '../../../validators/validator';
import { changePasswordAction } from '../../../actions/changePassword';

/**
 *
 *
 * @class ChangePassword
 *
 * @extends {Component}
 */
class ChangePassword extends Component {
/**
 * Creates an instance of ChangePassword
 *
 *
 * @param {object} props
 *
 *
 * @memberOf ChangePassword
 */
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      password: '',
      passwordConfirmation: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * Handle onChange events for Change Password
   *
   * @method onChange
   *
   * @memberof ChangePassword
   *
   * @param {object} event
   *
   * @returns {function} a function that handles change event on inputs
   */
  onChange(event) {
    event.preventDefault();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  /**
 *
 *
 * @memberof ChangePassword
 *
 * @returns {void}
 */
  onClick() {
    if (this.isValid()) {
      this.setState({ errors: {} }); 
      this.props.changePasswordAction({
        newPassword: this.state.password,
        oldPassword: this.state.oldPassword
      });
      this.setState({
        password: '',
        passwordConfirmation: '',
        oldPassword: ''
      });
    }
  }

  /**

   * @method isValid
   * @memberof ChangePassword
   * @returns {function} a validation function and returns errors in string format
   */
  isValid() {
    const { errors, isValid } = validatePasswordInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    } else {
      return isValid;
    }
  }
  /**
   *
   *
   * @returns {component} Component
   * @memberof ChangePassword
   *
   * @memberof ChangePassword
   */
  render() {
    return (
      <div>
        <Row>
          <div className="signup center-align">
            <div className="signup-wrapper" id="change-password">
              <Row>
                
                <div className="signup-header">
                  Change Password
                </div>
                <Input
                  type="password"
                  label="Enter Old Password"
                  s={12}
                  name="oldPassword"
                  required
                  value={this.state.oldPassword}
                  onChange={this.onChange}
                  error={this.state.errors.oldPassword}
                >
                  <Icon>lock</Icon>
                </Input>
                <Input
                  type="password"
                  label="Password"
                  s={12}
                  name="password"
                  required
                  value={this.state.password}
                  onChange={this.onChange}
                  error={this.state.errors.password}
                >
                  <Icon>lock</Icon>
                </Input>
                <Input
                  type="password"
                  name="passwordConfirmation"
                  label="Confirm Password"
                  s={12}
                  required
                  value={this.state.passwordConfirmation}
                  onChange={this.onChange}
                  error={this.state.errors.passwordConfirmation}
                >
                  <Icon>lock</Icon>
                </Input>
                <Col className="center" s={12}>
                  <div className="login-btn">
                    <Button onClick={this.onClick} waves="light">Change Password</Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Row>
      </div>
    );
  }
}

export default connect(null, { changePasswordAction })(ChangePassword);
