import React from 'react'
import css from '../css/style.scss'
import { Input, Col,Row,Icon, Button } from 'react-materialize'
import Validator from 'validator'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'

export class Registerform extends React.Component{
   
    constructor () {
        super();
        this.state ={
              firstname:'',
              surname:'',
              username:'',
              email:'',
              password:'',
              confirmpass:'',
            loading:false,
            usernameError: '',
            passwordError: '',
            emailError: ''
          };
          this.onBlur = this.onBlur.bind(this);
          this.onChange = this.onChange.bind(this);
          this.onFocus = this.onFocus.bind(this)
        
    }

  
onChange = e => 
  this.setState({
      [e.target.name]: e.target.value
});

onBlur(e){
    const name = e.target.name,
    value = e.target.value;

    switch(name){
        case 'username':
        if(!Validator.isLength(value,{min:5, max:17})){
            this.setState({
                usernameError: 'Username must be between 5 qnd 17 characters'
            })
        }
        break;
        case 'password':
        if(!Validator.isLength(value,{min:5, max:17})){
            this.setState({
                passwordError: 'Password must be between 5 qnd 17 characters'
            })
          }
          else if (!Validator.isAlphanumeric(value)){
             
            this.setState({
              passwordError: 'Password must be Alphanumeric'
          })
          }

        break;
        case 'email':
        if(!Validator.isEmail(value)){
            this.setState({
                emailError: 'Please enter a valid email'
            })
        }
        break;
        
    }
} 

onSubmit=(e) => {
    e.preventDefault();
    if(this.setState.length === 0){
      <Redirect to='/' push/>
      this.props.submit(this.state.data);
  }

};


onPasswordcheck=(e)=>{

  if(!(this.state.password === this.state.confirmpass))
      { 
          this.setState({
            passwordError: 'Passwords do not match'
        })
      }
}


onFocus=(e)=>{
    const name = e.target.name;
    switch(name){
        case 'username':
        this.setState({
            usernameError:''
        })
        break;
        case 'email':
        this.setState({
            emailError:''
        })
        break;
        case 'password':
        this.setState({
            passwordError:''
        })
        break;
        case 'confirmpass':
        this.setState({
          passwordError:''
      })


    }

}



    render(){
      const {data} = this.state;
        return(  
          
            <div className='regcon'>   
                <Row>
                    <form onSubmit={this.onSubmit}>
                    <Input s={12} label="First Name" 
                        required
                        name='firstname'
                        onChange={this.onChange}>
                        <Icon>contacts</Icon>
                    </Input>
                    <Input s={12} label="Surname" 
                    required
                    name='surname'
                    onChange={this.onChange}>
                        <Icon>contacts</Icon>
                    </Input>
                    <Input s={12} label="Username"  
                        required 
                        name='username'
                        onBlur = {this.onBlur}
                        onFocus = {this.onFocus}
                        onChange={this.onChange}
                        error= {this.state.usernameError}>
                    
                        <Icon>account_circle</Icon>
                    </Input>
                    
                    <Input placeholder="example@example.com" 
                    name='email'
                    s={12} label="Email" 
                    required 
                    onBlur = {this.onBlur}
                    onFocus = {this.onFocus}
                    onChange={this.onChange}
                    error= {this.state.emailError} >
                        <Icon>mail</Icon>
                    </Input>
                    <Input type="password" 
                        label="Password" s={12}
                        name='password' 
                         required 
                         onBlur = {this.onBlur}
                         onFocus = {this.onFocus}
                         onChange={this.onChange}
                         error= {this.state.passwordError} >
                         <Icon>lock</Icon></Input>
                    <Input type="password" 
                        name='confirmpass'
                        label="Confirm Password" s={12} 
                        required 
                        onChange={this.onChange}
                        onBlur = {this.onPasswordcheck}
                        onFocus = {this.onFocus}
                        >
                            <Icon>lock</Icon>
                    </Input>
                        <Col s={12} className="center">
                            <Button waves='light'>Sign Up</Button>
                        </Col>
                        <Col s={12} className="center">
                            <br/><a className= "btn btn-social btn-google">
                                <span className="fa fa-google">
                                </span> Sign in with Google</a>
                        </Col>
                    </form>
                </Row>
         </div>  
                      
             
           
            
        );
    }
    
    };
    
    Registerform.propTypes ={
        submit: PropTypes.func.isRequired
    }