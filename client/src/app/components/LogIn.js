import React from 'react'
import {NavLink} from 'react-router-dom'
import {Input, Col,Row,Icon, Button} from 'react-materialize'




export  class LogIn extends React.Component{
    
    render(){
        // const user = {name:'Guest'}
        // const message = `Welcome ${user.name}` 
        
        const body =<p> Please Login or Click on Register to Start</p>
        return(
            <div>
                <h3>Log In</h3>
            <div className='login'> 
                
                <Row>
                        <Input placeholder="Username" s={12} label="Username"  ><Icon>account_circle</Icon></Input>
                    
                        <Input placeholder=" Password" type="password" label="Password" s={12}><Icon>lock</Icon></Input>
                    
                   <Col s={12}>
                        <Input   defaultValue="Forgotten Password" disabled className="#efebe9 brown-text text-lighten-5" />
                        <Input  defaultValue="Sign Up" disabled className="#efebe9 brown-text text-lighten-5" />
                    </Col>
                    <Col className='center' s={12}>
		                <Button waves='light'>Login</Button>
                    </Col>
                    <Col className='center' s={12}>
		                <br/><a className= "btn btn-social btn-google"><span className="fa fa-google"></span> Sign in with Google</a>
                    </Col>
                </Row>  
            </div> 
          </div>
            
        );
    }
    
    };



