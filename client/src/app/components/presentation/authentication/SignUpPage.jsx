import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import AuthenticationWrapper from './AuthenticationWrapper';
import TextInput from '../../presentation/common/modal/form/TextInput';


const SignUpPage = props => (
  <div>
    <Row>
      <div className="signup center-align">
        <div className="signup-wrapper">
          <Row>
            <div className="signup-header">
              SIGNUP
            </div>
            <form onSubmit={props.onSignUpSubmit}>
              <div className="signup-content">
                <Row>
                  <Col s={6} l={6}>
                    <TextInput
                      label="Firstname"
                      type="text"
                      name="firstname"
                      value={props.user.firstname}
                      onChange={props.onChange}
                      errors={props.errors.firstname}
                      prefix="contacts"
                    />
                  </Col>
                  <Col s={6} l={6}>
                    <TextInput
                      label="Lastname"
                      name="lastname"
                      type="text"
                      value={props.user.lastname}
                      onChange={props.onChange}
                      errors={props.errors.lastname}
                      prefix="contacts"
                    />
                  </Col>
                  <Col s={12} l={12}>
                    <TextInput
                      label="Username"
                      name="username"
                      type="text"
                      value={props.user.username}
                      onChange={props.onChange}
                      errors={props.errors.username}
                      prefix="account_circle"
                    />
                  </Col>
                  <Col s={12} l={12}>
                    <TextInput
                      label="Email"
                      name="email"
                      type="email"
                      value={props.user.email}
                      onChange={props.onChange}
                      errors={props.errors.email}
                      prefix="mail"
                    />
                  </Col>
                  <Col l={12}>
                    <TextInput
                      label="Password"
                      name="password"
                      type="password"
                      value={props.user.password}
                      onChange={props.onChange}
                      errors={props.errors.password}
                      prefix="lock"
                    />
                  </Col>
                  <Col l={12}>
                    <TextInput
                      label="Confirm Password"
                      name="passwordConfirmation"
                      type="password"
                      value={props.user.passwordConfirmation}
                      onChange={props.onChange}
                      errors={props.errors.passwordConfirmation}
                      prefix="lock"
                    />
                  </Col>
                </Row>
                <Col s={12} l={12}>
                  <NavLink to="/login">
                    <p>Sign In</p>
                  </NavLink>
                </Col>
                <Col s={12} className="center">
                  <Button className="signup-btn" waves="light">Sign Up</Button>
                </Col>
              </div>
            </form>
          </Row>
        </div>
      </div>
    </Row>
  </div>
);

SignUpPage.propTypes = {
  onSignUpSubmit: PropTypes.func,
  onChange: PropTypes.func,
  user: PropTypes.object,
  errors: PropTypes.object
};

const AuthSignUpPage = AuthenticationWrapper(SignUpPage);

export { SignUpPage };
export default AuthSignUpPage;
