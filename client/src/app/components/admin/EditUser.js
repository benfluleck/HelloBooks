import React from 'react'
import { Input, Button, CollectionItem, Collection, Collapsible, CollapsibleItem, Col, Tabs ,  Tab } from 'react-materialize'


/*
eslint-disable
 */
export class EditUser extends React.Component{
    constructor () {
        super();
        this.state ={
              firstname:'',
              surname:'',
              username:'',
            loading:false,
           booktitleError: ''
          };
        
          this.onChange = this.onChange.bind(this); 
    }

    onChange = e => 
    this.setState({
        [e.target.name]: e.target.value
    });
    onSubmit=(e) => {
        e.preventDefault();
        if(this.setState.length === 0){
          console.log(errors)
          this.props.submit(this.state.data);
      }
    
    };
    
    render(){
        return( 
                <div>
                    <h5> Edit User</h5>
                <div>
                    <form>
                    
                    <Input label="Firstname" name='firstname' l={12} required onChange={this.onChange}/>
                    <Input label="Surname" l={12} name='surname' required onChange={this.onChange}/>
                    <Input label="Username" l={12} name='username' required onChange={this.onChange}/>
                    
                    <Input type='select' label="User Level" l={12}>
                    <option value='1'>--Select--</option>
                    <option value='2'>Gold</option>
                    <option value='3'>Silver</option>
                    <option value='4'>Bronze</option>
                    </Input>
                    <br/>
                    
                    
                    <Input s={12} l={8} type='select' label="Select Action (Edit / Delete)" >
                    <option value='1'>--Select--</option>
                        <option value='2'>Edit</option>
                        <option value='3'>Delete</option>
                        
                    </Input>

                    <Col s={12} l={8} className="center">
                        <Button waves='light'>Submit</Button>
                    </Col>
                    </form>
                </div>
                </div>

        );
    }
}
