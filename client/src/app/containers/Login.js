import React from 'react'
import { Loginform } from '../components/Loginform';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../actions/auth'
import swal from 'sweetalert2'

class Login extends React.Component{
    submit = data => {
        this.props.login(data)
            .then(() => {
                
               this.props.history.push('/dashboard');
            })
            .then(
                (res) =>{ swal(
                  'Welcome!',
                  'You are about to be redirected!',
                  'success'
                ),
                (error)=>{
                  swal(
                    'Oops...',
                    'Logon denied!',
                    'error'
                  )
                }
    
                },
              )
              .catch((err)=>{
                swal(
                  'Oops...',
                  'Not sure what went wrong try again',
                  'error'
                )
              })
              ;
        // this.props.login(JSON.stringify(data)).then(() => this.props.history.push('/'))
        // console.log(data.response)
        //console.log(username),
        //console.log(password)
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



// const  mapStateToProps =({user})=> {
//     return{
//         submit : state.submit
//     };
// }

export default connect(null, {login})(Login);
