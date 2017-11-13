import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {signup} from '../../../actions/authenticate';
import {connect} from 'react-redux';
import SignUpForm from '../../presentation/authentication/SignUpPage.jsx'

/**
 * handles registartion of users
 * @class SignUpPage
 * @extends {React.Component}
 */
class SignUpPage extends React.Component {
  submit = (data)=> {
  this.props.
    signup(data)
.then(()=>{console.log('Nice to meet you')})

  }
 /**
 * handles signing in of users
 * @class SignInPage
 * @extends {React.Component}
 */
  render() {
      return (
          <SignUpForm submit={this.submit}/>

    );
  }

}


SignUpPage.propTypes = {
  signup: PropTypes.func.isRequired

};


export default connect(null , { signup }) (SignUpPage);
