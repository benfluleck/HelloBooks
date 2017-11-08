import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {signup} from '../../../actions/authenticate';
import {connect} from 'react-redux';
import SignUpForm from '../../presentation/authentication/SignUpPage.jsx'


class SignUpPage extends React.Component {
  submit = (data)=> {
  this.props.
    signup(data)
.then(()=>{console.log('Nice to meet you')})

  }
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
