import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Col, Row, Icon, Button } from 'react-materialize';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import { login } from '../../../actions/authenticate';
import Bottom from '../../../components/presentation/common/Footer.jsx';

/**
 * SignIn component
 *
 * @class SignIn
 *
 * @extends React.Component
 */
class SignInPage extends Component {
  /**
   * Creates an instance of SignInPage.
   *
   * @param {object} props
   *
   * @memberOf SignInPage
   */
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.onChange = this
      .onChange
      .bind(this);
    this.onSubmit = this
      .onSubmit
      .bind(this);
    this.handleGoogleLogin = this
      .handleGoogleLogin
      .bind(this);
  }

  /**
   * Handle onChange events on form inputs
   *
   * @method onChange
   *
   * @memberof SignIn
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
   * @description This is called when the submit button is clicked
   *
   * @method submit
   *
   * @param {object} e
   *
   * @memberof SignIn
   *
   * @returns {function} response
   */
  onSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .login(this.state)
      .then((response) => {
        if (response.success && response.isAdmin) {
          return (this.props.history.push('/admin'));
        }

        this.props
          .history
          .push('/dashboard');
      })
      .catch(() => {

      });
  }

  /**
   * @returns {*} void
   *
   * @param {any} response
   *
   * @memberof Login
   */
  handleGoogleLogin(response) {
    this
      .props
      .login(response.profileObj)
      .then((res) => {
        if (res) {
          this.props
            .history
            .push('/dashboard');
        }
      });
  }
  /**
   * render login component
   *
   * @method render
   *
   * @member SignIn
   *
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <div className="login center-align">
          <div className="login-wrapper">
            <Row>
              <div className="login-header">
                LOGIN
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="login-content">
                  <Input
                    s={12}
                    label="Username"
                    required
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  >
                    <Icon>account_circle</Icon>
                  </Input>
                  <Input
                    type="password"
                    label="Password"
                    name="password"
                    value={this.state.password}
                    required
                    s={12}
                    onChange={this.onChange}
                  >
                    <Icon>lock</Icon>
                  </Input>

                  <Col s={12} l={8}>
                    {/* <NavLink to='/forgetpass'>
                      <p>Forgotten Password</p>
                    </NavLink> */}
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
                        onSuccess={this.handleGoogleLogin}
                        onFailure={this.handleGoogleLogin}
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
        <Bottom />
      </div>
    );
  }
}

export default connect(null, { login })(SignInPage);
