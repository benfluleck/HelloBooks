import React from 'react'
import css from '../css/style.scss'
import { Input, Col,Row,Icon, Button, Table } from 'react-materialize'
import Validator from 'validator'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import Tabs from 'muicss/lib/react/tabs';
import Tab from 'muicss/lib/react/tab';


export class Profile extends React.Component{

  constructor () {
    super();
    this.state ={
        email:'',
        newpasword:'',
        oldpassword:'',
        //confirmpass:'',
        loading:false,
       //confirmpassError: ''
        newPasswordError:'',
        emailError:''
      };
      this.onBlur = this.onBlur.bind(this);
      this.onChange = this.onChange.bind(this);
      this.onFocus = this.onFocus.bind(this)
}


onChange
(e){this.setState({
  [e.target.name]: e.target.value
});}

  
  
  onBlur(e){
    const name = e.target.name,
   value = e.target.value;
   switch(name){
    case 'newpassword':
    if(!Validator.isLength(value,{min:5, max:17})){
        this.setState({
            newPasswordError: 'Password must be between 5 qnd 17 characters'
        })
      }
      else if (!Validator.isAlphanumeric(value)){
          
        this.setState({
          newPasswordError: 'Password must be Alphanumeric'
      })
      break;
      }
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
        console.log(errors)
        this.props.submit(this.state.data);
    }
  
  };
  
  
  onPasswordcheck=(e)=>{
  
    if((this.state.oldpassword === this.state.newpasword))
        { 
            this.setState({
              oldpassError: 'Change your passwords'
          })
        }
  }

  onFocus=(e)=>{
      const name = e.target.name;
      
          this.setState({
            newPasswordError:''
        })
      }

    render(){
      
        return(
                <div className='profile-con'>
                    <h4> Guest Name</h4>
                <Row>
                <Tabs defaultSelectedIndex={0}>
                <Tab value="pane-1" label="Profile" >
                  <form onSubmit={this.onSubmit}>
                <Col s={12} m={4} l={4} className='center profpic'>
                  
                    <div className ='profile'/>
                    
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input type="file"></input>
                        </div>
                        <br/>
                        <br/>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                </Col>
                <Col s={12} m={8} l={8}>
                
                    <Input s={12} disabled 
                        label="First Name" 
                        name='firstname'
                        placeholder='First Name'>
                        <Icon>contacts</Icon>
                    </Input>
                    <Input s={12} 
                        disabled label="Surnmame" 
                        name='surname'
                        placeholder='Surname'>
                        <Icon>contacts</Icon>
                    </Input>        
                        <Input s={12} disabled 
                        label="Username" name='username'
                        placeholder='Usename'>
                        <Icon>account_circle</Icon>
                    </Input>
                    <Input s={12} label="Email" 
                        name='email' 
                        error={this.state.emailError}
                         onChange={this.onChange}
                         onBlur = {this.onBlur}
                         onFocus={this.onFocus}
                       
                        >
                        <Icon>mail</Icon>
                    </Input>
                    <Input  
                        type="password" 
                        label="Old Password"
                        name='oldpassword'
                        >
                        <Icon>lock</Icon>
                     </Input>
                    <Input  type="password" 
                        label="Confirm New Password"
                        
                         name='newpassword'
                         error={this.state.newPasswordError}
                         onChange={this.onChange}
                         onBlur = {this.onBlur}
                         onFocus={this.onFocus}
                         >
                        <Icon>lock</Icon>
                    </Input>
                    <br/>
                    <br/>
                    <br/>
                    <div className='submitbtn'>            
                    <Col s={12} className="center">
                        <Button waves='light'>Submit</Button>
                    </Col>
                    </div>
                
                </Col>
                </form></Tab>
                <Tab value="pane-2" label="Web Activity" >
                  <Row>
                    
                    <Col l={12}>
                    <Table centered ={true}  responsive ={true}>
                        <thead>
                            <tr>
                                <th data-field="id">Name</th>
                                <th data-field="name">Item Name</th>
                                <th data-field="price">Item Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Alvin</td>
                                <td>Eclair</td>
                                <td>$0.87</td>
                            </tr>
                            <tr>
                                <td>Alan</td>
                                <td>Jellybean</td>
                                <td>$3.76</td>
                            </tr>
                            <tr>
                                <td>Jonathan</td>
                                <td>Lollipop</td>
                                <td>$7.00</td>
                            </tr>
                        </tbody>
                    </Table>
                    </Col>
                </Row>
                </Tab>
              </Tabs>
              </Row>
              </div>           
        );
    }

    };