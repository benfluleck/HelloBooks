import React from 'react'
import {Loginform} from '../components/Loginform';

export class Login extends React.Component{
    submit = (data) =>{
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
