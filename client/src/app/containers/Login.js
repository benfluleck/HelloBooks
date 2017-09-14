import React from 'react'
import { Loginform } from '../components/Loginform';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { login } from '../actions/auth'
import swal from 'sweetalert2'

class Login extends React.Component{
    submit = data => {
        this.props.login(data)
            // .then(() => {
            //  //  this.props.history.push('/dashboard');
            // })
            .then((res) =>{ 
                console.log(res.user.data.success)
             if (res.user.data.success){
                swal(
                  'Welcome!',
                  res.user.data.message,
                  'success'     
                );
                this.props.history.push('/dashboard');
            }else{
                swal(
                  'Oops...',
                  res.user.data.message,
                  'error'
                );
                this.props.data.loading =false;
            }
            })
            
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
