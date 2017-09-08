import React from 'react'
import css from '../css/style.scss'
import {Input, Col,Row,Icon, Button} from 'react-materialize'

export class Register extends React.Component{
    render(){
        return(
            <div className='register'>

           
            <div className='regcon'>
               
                    <Row>
												<Input placeholder="First Name" s={12} label="First Name"  ><Icon>contacts</Icon></Input>
												<Input placeholder="Surname" s={12} label="Surnmame" ><Icon>contacts</Icon></Input>
                        
                    
                        
                        <Input placeholder="Username" s={12} label="Username"  ><Icon>account_circle</Icon></Input>
                        
                    
                         <Input placeholder="Email" s={12} label="Email"  ><Icon>mail</Icon></Input>
                       
                    
                        <Input placeholder="Password" type="password" label="Password" s={12} ><Icon>lock</Icon></Input>
                       
                    
                        <Input placeholder="Password" type="password" label="Confirm Password" s={12} ><Icon>lock</Icon></Input>
                        
                    
											<Col s={12} className="center">
												<Button waves='light'>Sign Up</Button>
											</Col>
											<Col s={12} className="center">
												<br/><a className= "btn btn-social btn-google"><span className="fa fa-google"></span> Sign in with Google</a>
											</Col>
                    </Row>
                
            </div> 
        </div>    
                      
             
           
            
        );
    }
    
    };
    