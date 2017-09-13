import React from 'react'
import {NavLink} from 'react-router-dom'
import {Row,Col, Button, Input, Icon} from 'react-materialize'
import css from '../css/style.scss'
import Validator from 'validator' 




export class Forgetpassform extends React.Component{
  constructor () {
    super();
    this.state ={
            email:'',
            loading:false,
            emailError: ''
          };
          this.onBlur = this.onBlur.bind(this);
          
          this.onFocus = this.onFocus.bind(this)
        }
          onChange = e => 
          this.setState({
              [e.target.name]: e.target.value
        });

        onBlur= (e)=>{
            const name = e.target.name,
            value = e.target.value;
            if(!Validator.isEmail(value)){
                this.setState({
                    emailError: 'Please enter a valid email'
                })
            }
        }

        onSubmit=(e) => {
            e.preventDefault();
            if(this.setState.length === 0){
              console.log(errors)
              this.props.submit(this.state.data);
          }
        
        };

        onFocus=(e)=>{
          const name = e.target.name;
          this.setState({
            emailError:''
        })
        
        
        }
    
        
    
    render(){
      const {data} = this.state;
    return(
        <div>
 
            <p>Email address you used to log in to your account</p>
            <p>We will send instructions to your email to reset your password</p>

            <form>
            <div className='forgetpassform'>    
            <Input name='email' 
            l={8} label="Email"
            required 
            onBlur = {this.onBlur}
            onFocus = {this.onFocus}
            onChange={this.onChange}
            error= {this.state.emailError} >
             <Icon>mail</Icon></Input>
            <Col className='center' l={8}>
                <Button waves='light'>Continue</Button>
            </Col>
            </div>
            </form>
            
            
        </div>           
 
    );
  }
}
