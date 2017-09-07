import React from 'react'
import {NavLink} from 'react-router-dom'
import {Input, Row,Icon, Button} from 'react-materialize'



export  class LogIn extends React.Component{

    render(){
        return(
        <div className='welcome'>
            <h5>{this.props.message}</h5>
            <div className='container'>
                <Row>
                    <Row>
                        <Input placeholder="Placeholder" s={10} label="Username" ><Icon>account_circle</Icon></Input>
                    </Row>
                    <Row>
                        <Input placeholder="Placeholder" type="password" label="Password" s={10} ><Icon>account_circle</Icon></Input>
                    </Row>
                    <Row>
                        <Input s={12} label="disabled" defaultValue="I am not editable" disabled />
                    </Row>
                    <Row>
		                <Button waves='light'>Login</Button>
                    </Row>
                </Row>  
            </div> 
        </div>    
            
        );
    }
    
    };



