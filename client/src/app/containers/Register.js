import React from 'react'
import {Registerform} from '../components/Registerform';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {signup} from '../actions/auth';
import swal from 'sweetalert2';

class Register extends React.Component {

  submit = (state) => {

    this
      .props
      .signup(state)
      .then((res) => {
      
        if (res.success) {

          swal('Welcome, Please Log In !', res.name, 'success');
          this
            .props
            .history
            .push('/');
        } else {
          swal('Oops...',res.error.data.message, 'error');

        }
      })
  }
  render() {

    return (
      <div className='register'>

        <h3>
          Register</h3>
        <Registerform submit ={this.submit}/>

      </div>
    );
  }

}

Register.propTypes = {

  signup: PropTypes.func

};

export default connect(null, {signup})(Register)
