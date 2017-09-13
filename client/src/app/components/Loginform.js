import React from 'react'
import {NavLink} from 'react-router-dom'
import {Input, Col,Row,Icon, Button} from 'react-materialize'
import ReactCssTransitions from "react-addons-css-transition-group"
import PropTypes from 'prop-types'

export  class Loginform extends React.Component{
  constructor () {
    super();
    this.state ={
        data:{
          username:'',
          password:'',
        },
        loading:false,
        errors:{}
      };

    }
      onChange = e => 
        this.setState({
          data:{...this.state.data,[e.target.name]:e.target.value}
      
      })
    onSubmit=e => {
      e.preventDefault();
  
    const errors =this.validate(this.state.data);
    this.setState({errors})
    if(Object.keys(errors).length ===0){
        this.props.submit(this.state.data);
    }
  
  };
  
    
    render(){
      const {data, errors} = this.state;
      
        // const user = {name:'Guest'}
        // const message = `Welcome ${user.name}` 
        
        const body =<p> Please Login or Click on Register to Start</p>
        return(
           
               
            <div className='login'> 
                
                <Row>
                     <form onSubmit={this.onSubmit}>
                      <Input  s={12} label="Username"
                         required name='username' 
                         value={data.username} 
                         error={errors.username}
                         onChange={this.onChange} >
                         <Icon>account_circle</Icon>
                      </Input>
                      <Input  type="password"
                       label="Password" name='password' 
                       value={data.password} 
                       error={errors.password}required s={12} 
                        onChange={this.onChange}>
                        <Icon>lock</Icon>
                      </Input>
                    
                   <Col s={12} l={8}>
                      <div className="#efebe9 brown-text text-lighten-5">
                        <NavLink to='/forgetpass'><p>Forgotten Password</p>
                      </NavLink>
                      <NavLink to='/register'><p>Sign Up</p></NavLink>
                      </div>
                      
                    </Col>
                    <Col className='center' s={12}>
		                  <Button waves='light'>Login</Button>
                    </Col>
                    <Col className='center' s={12}>
		                  <br/><a className= "btn btn-social btn-google"><span className="fa fa-google"></span> Sign in with Google</a>
                    </Col>
                    </form>
                </Row>  
            </div> 
         
            
        );
    }
    
    };






