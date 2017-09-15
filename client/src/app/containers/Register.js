import React from 'react'
import { Registerform } from '../components/Registerform';

export class Register extends React.Component{
    submit = (data) =>{
        console.log(data)
    }
    render(){

        return(
            <div className='register'>

           <h3> Register</h3>
            <Registerform submit ={this.submit} /> 
           
        </div>  
        );
    }

}
