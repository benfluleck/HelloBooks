import React from 'react'
import {NavLink} from 'react-router-dom'
import {Input, Col,Row,Icon, Button} from 'react-materialize'
import ReactCssTransitions from "react-addons-css-transition-group"

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
                     <form>
                      <Input  s={12} label="Username" required value={data.username} onChange={this.onChange} ><Icon>account_circle</Icon></Input>
                      <Input  type="password" label="Password" s={12} required value={data.name} onChange={this.onChange}><Icon>lock</Icon></Input>
                    
                   <Col s={12}>
                      <Input  defaultValue="Forgotten Password" disabled className="#efebe9 brown-text text-lighten-5" />
                      <Input  defaultValue="Sign Up" disabled className="#efebe9 brown-text text-lighten-5" />
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



