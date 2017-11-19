import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Input, Col, Row, Icon, Button} from 'react-materialize';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Bottom from '../../../components/presentation/common/Footer.jsx'

/**
 * SignIn component
 * @class SignIn
 * @param {object}
 * @extends React.Component
 */
class SignInPage extends Component {
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
  }

  /**
   * Handle onChange events on form inputs
   * @method onChange
   * @memberof SignIn
   * @param {object} event
   * @returns {function} a function that handles change event on inputs
   */
  onChange = e => {
    e.preventDefault();
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  /**
   * Submit state
   * This is called when the submit button is clicked
   * @method submit
   * @memberof SignIn
   * @returns {void}
   */
  onSubmit = (e) => {
    e.preventDefault();
    this
      .props
      .submit(this.state)

  }

  /**
   * render login component
   * @method render
   * @member SignIn
   * @returns {object} component
   */
  render() {
    return (
      <div>
        <div className='login center-align'>
          <div className='login-wrapper'>
            <Row>
              <div className='login-header'>
                LOGIN
              </div>
              <form onSubmit={this.onSubmit}>
                <div className='login-content'>
                  <Input
                    s={12}
                    label="Username"
                    required
                    name='username'
                    value={this.state.username}
                    onChange={this.onChange}>
                    <Icon>account_circle</Icon>
                  </Input>
                  <Input
                    type="password"
                    label="Password"
                    name='password'
                    value={this.state.password}
                    required
                    s={12}
                    onChange={this.onChange}>
                    <Icon>lock</Icon>
                  </Input>

                  <Col s={12} l={8}>
                    <NavLink to='/forgetpass'>
                      <p>Forgotten Password</p>
                    </NavLink>
                    <NavLink to='/signup'>
                      <p>Sign Up</p>
                    </NavLink>
                  </Col>
                  <Col className='center' s={12}>
                    <div className='login-btn'>
                      <Button waves='light'>Login</Button>
                    </div>
                  </Col>
                  <Col className='center' s={12}>
                    <br/>
                    <a className="btn btn-social btn-google">
                      <span className="fa fa-google"></span>
                      Sign in with Google</a>
                  </Col>
                </div>
              </form>
            </Row>

          </div>
        </div>
        <Bottom/>
      </div>

    );
  }

}

export default SignInPage;
