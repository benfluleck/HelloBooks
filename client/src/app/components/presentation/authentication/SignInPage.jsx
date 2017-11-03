import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Input, Col, Row, Icon, Button} from 'react-materialize';
import PropTypes from 'prop-types';



class SignInPage extends Component{
	constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    };
  }
render(){
return(
<Row>
  <div className='login center-align'>
    <div className='login-wrapper'>
    <Row>
          <form onSubmit={this.onSubmit}>
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

            {/* <Col s={12} l={8}>
              <div className="#efebe9 brown-text text-lighten-5">
                <NavLink to='/forgetpass'>
                  <p>Forgotten Password</p>
                </NavLink>
                <NavLink to='/register'>
                  <p>Sign Up</p>
                </NavLink>
              </div>

            </Col> */}
            <Col className='center' s={12}>
              <Button waves='light'>Login</Button>
            </Col>
            <Col className='center' s={12}>
              <br/>
              <a className="btn btn-social btn-google">
                <span className="fa fa-google"></span>
                Sign in with Google</a>
            </Col>
          </form>
        </Row>
    </div>
  </div>
</Row>

);
}

}

export default SignInPage;
