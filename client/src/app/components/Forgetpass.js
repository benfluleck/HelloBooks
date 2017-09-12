import React from 'react'
import {NavLink} from 'react-router-dom'
import {Row,Col, Button, Input, Icon} from 'react-materialize'
import css from '../css/style.scss'




export const Forgetpass = (props)=>{

    return(
        <div>
            <h3> Forgot Your Password?</h3>
            
            <p>Email address you used to log in to your account</p>
            <p>We will send instructions to your email to reset your password</p>

            <form>
            <Input placeholder="Email" l={8} label="Email"  ><Icon>mail</Icon></Input>
            <Col className='center' l={8}>
		        <Button waves='light'>Continue</Button>
            </Col>
            </form>
            
            
        </div>           
         
       
        
    );

}