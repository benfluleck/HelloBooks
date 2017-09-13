import React from 'react'
import {Loginform} from '../components/Loginform';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../actions/auth'

export class Login extends React.Component{
    submit = (data) =>
    { this.props.login(data).then(()=>this.props.history.push('/'))
        console.log(data)
    }
    render(){

        return(
            <div className='register'>

           <h3> Login</h3>
            <Loginform submit ={this.submit} /> 
           
        </div>  
        );
    }

   
}

connect(null,{login})(Login)

Login.propTypes ={
    history: PropTypes.shape({
        push:PropTypes.func.isRequired
    }).isRequired,
    login: PropTypes.func.isRequired

};
