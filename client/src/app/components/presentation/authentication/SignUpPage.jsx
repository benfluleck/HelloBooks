import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Col, Row, Icon, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { validateSignupInput } from '../../../validators/validator';
import Bottom from '../../../components/presentation/common/Footer.jsx';

/**
 * SignUp component
 *
 * @class SignUp
 *
 * @extends React.Component
 *
 * @param {object} props
 *
 * @return {object} SignUp Page
 * */
class SignUpPage extends Component {
  /**
   * Creates an instance of SignUpPage.
   *
   * @param {any} props
   *
   * @memberOf SignUpPage
   */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      errors: {}
    };

    this.onChange = this
      .onChange
      .bind(this);
    this.onSubmit = this
      .onSubmit
      .bind(this);
  }

  /**
   * Handle onChange events on form inputs
   *
   * @method onChange
   *
   * @memberof SignUp
   *
   * @param {object} e
   *
   * @returns {function} a function that handles change event on inputs
   */
  onChange = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }


  /**
   * Submit state
   * This is called when the submit button is clicked
   *
   * @method submit
   *
   * @memberof SignUp
   *
   * @param {object} e
   *
   * @returns {void}
   */
  onSubmit = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props
        .submit(this.state);
    }
  }

  /**
   * Handle onChange events on form inputs
   *
   * @method isValid
   *
   * @memberof SignUp
   *
   * @returns {bool} true/ false
   */
  isValid() {
    const { errors, isValid } = validateSignupInput(this.state);
    if (!isValid) {
      this.setState({ errors });
    } else {
      return isValid;
    }
  }

  /**
   * render login component
   *
   * @method render
   *
   * @member SignUp
   *
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <Row>
          <div className="signup center-align">
            <div className="signup-wrapper">
              <Row>
                <div className="signup-header">
                  SIGNUP
                </div>
                <form onSubmit={this.onSubmit}>
                  <div className="signup-content">
                    <Input
                      s={12}
                      l={6}
                      label="First Name"
                      required
                      name="firstname"
                      value={this.state.firstname}
                      onChange={this.onChange}
                      error={this.state.errors.firstname}
                    >
                      <Icon>contacts</Icon>
                    </Input>
                    <Input
                      s={12}
                      l={6}
                      label="Surname"
                      required
                      name="lastname"
                      value={this.state.lastname}
                      onChange={this.onChange}
                      error={this.state.errors.lastname}
                    >
                      <Icon>contacts</Icon>
                    </Input>
                    <Input
                      s={12}
                      label="Username"
                      required
                      value={this.state.username}
                      name="username"
                      onChange={this.onChange}
                      error={this.state.errors.username}
                    >
                      <Icon>account_circle</Icon>
                    </Input>
                    <Input
                      name="email"
                      s={12}
                      label="Email"
                      required
                      value={this.state.email}
                      onChange={this.onChange}
                      error={this.state.errors.email}
                    >
                      <Icon>mail</Icon>
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
                    <Col s={12} l={8}>
                      <NavLink to="/forgetpass">
                        <p>Forgotten Password</p>
                      </NavLink>
                      <NavLink to="/login">
                        <p>Sign In</p>
                      </NavLink>
                    </Col>
                    <Col s={12} className="center">
                      <Button waves="light">Sign Up</Button>
                    </Col>
                  </div>
                </form>
              </Row>
            </div>
          </div>
        </Row>
        <Bottom />
      </div>
    );
  }
}

export default SignUpPage;
