import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Input, Col, Row, Icon, Button} from 'react-materialize';
import PropTypes from 'prop-types';
import {login} from '../../../actions/authenticate';
import {connect} from 'react-redux';


class SignInPage extends Component{
	constructor(props) {
    super(props);
    this.state = {
    };

    this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
  e.preventDefault();
  this.setState({
      ...this.state,
      [e.target.name]: e.target.value
  })
}

onSubmit = (e) => {
  e.preventDefault();
      this
        .props
        .login(this.state)
  }

render(){
return(
<Row>
  <div className='login center-align'>
    <div className='login-wrapper'>
        <Row>
        <div className='login-header'>
          LOGIN
          </div>
            <form onSubmit={this.onSubmit}>
              <div className ='login-content'>
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
</Row>

);
}

}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  // showSignup: PropTypes.func.isRequired
};

export default connect(null , { login }) (SignInPage);  //export default connect(null, {login})(Login);
