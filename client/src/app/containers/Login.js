import React from 'react'
import {Loginform} from '../components/Loginform';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../actions/auth'

class Login extends React.Component{
    submit = data => {
        this.props.login(data)
            .then((res) => {
                console.log(res);
             //   this.props.history.push('/');
            })
            .catch(err=>{
                console.log('err');
            });
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
