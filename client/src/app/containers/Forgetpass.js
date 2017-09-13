import React from 'react'
import {Forgetpassform} from '../components/Forgetpassform';

export class Forgetpass extends React.Component{
    submit = (data) =>{
        console.log(data)
    }
    render(){

        return(
            <div className='forgetpass'>

           <h4> Forget Password</h4>
            <Forgetpassform submit ={this.submit} /> 
           
            </div>  
        );
    }

}