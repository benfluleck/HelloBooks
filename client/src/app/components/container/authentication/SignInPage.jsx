import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {login} from '../../../actions/authenticate';
import {connect} from 'react-redux';
import SignInForm from '../../presentation/authentication/SignInPage.jsx'

class SignInPage extends React.Component {
  submit = (data)=> {
  this.props.
    login(data)
.then(()=>{this.props.history.push('/mainpage')})

  }
  render() {
      return (
          <SignInForm submit={this.submit}/>
    );
  }

}


SignInPage.propTypes = {
  login: PropTypes.func.isRequired

};


export default connect(null , { login }) (SignInPage);
