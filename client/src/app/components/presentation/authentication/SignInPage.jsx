import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row, Button } from 'react-materialize';
import { GoogleLogin } from 'react-google-login';
import PropTypes from 'prop-types';
import AuthenticationWrapper from './AuthenticationWrapper.jsx';
import TextInput from '../../presentation/common/modal/form/TextInput.jsx';


const SignInPage = props => (
  <div>
    <div className="login center-align">
      <div className="login-wrapper">
        <Row>
          <div className="login-header">
            LOGIN
          </div>
          <form onSubmit={props.onSignInSubmit}>
            <div className="login-content">
              <Col s={12} l={12}>
                <TextInput
                  label="Username"
                  name="username"
                  type="text"
                  value={props.user.username}
                  onChange={props.onChange}
                  errors={props.user.errors.username}
                  prefix="account_circle"
                />
              </Col>
              <Col s={12} l={12}>
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  value={props.user.password}
                  onChange={props.onChange}
                  errors={props.user.errors.password}
                  prefix="lock"
                />
              </Col>
              <Col s={12} l={8}>
                <NavLink to="/signup">
                  <p>Sign Up</p>
                </NavLink>
              </Col>
              <Col className="center" s={12}>
                <div className="login-btn">
                  <Button waves="light">Login</Button>
                </div>
              </Col>
              <Col className="center" s={12}>
                <br />
                <a className="btn btn-social btn-google">
                  <span className="fa fa-google" />
                  <GoogleLogin
                    className="google-btn"
                    clientId={GOOGLE_CLIENT_ID}
                    onSuccess={props.handleGoogleLogin}
                    onFailure={props.handleGoogleLogin}
                  >
                    Sign in with Google
                  </GoogleLogin>
                </a>
              </Col>
            </div>
          </form>
        </Row>
      </div>
    </div>
  </div>
);

SignInPage.defaultProps = {
  onSignInSubmit: null,
  onChange: null,
  handleGoogleLogin: null,
  user: {}
};

SignInPage.propTypes = {
  onSignInSubmit: PropTypes.func,
  onChange: PropTypes.func,
  handleGoogleLogin: PropTypes.func,
  user: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};


const AuthSignInPage = AuthenticationWrapper(SignInPage);

export default AuthSignInPage;
