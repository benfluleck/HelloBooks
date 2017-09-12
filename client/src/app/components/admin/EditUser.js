import React from 'react'
import {Input, Button, CollectionItem, Collection, Collapsible, CollapsibleItem, Col, Tabs ,  Tab} from 'react-materialize'

export class EditUser extends React.Component{
    render(){
        return( 
                <div>
                    <h5> Edit User</h5>
                <div>
                    <form>
                    
                    <Input label="Firstname" l={12} />
                    <Input label="Surname" l={12}/>
                    <Input label="Username" l={12} />
                    
                    <Input type='select' label="User Level"  l={12}>
                    <option value='1'>Gold</option>
                    <option value='2'>Silver</option>
                    <option value='3'>Bronze</option>
                    </Input>
                    <br/>
                    
                    
                    <Input s={12} l={8} type='select' label="Select Action (Edit / Delete)" >
                        <option value='1'>Edit</option>
                        <option value='2'>Delete</option>
                        
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