import React from 'react'
import {Input, Button, CollectionItem, Collection, Collapsible, CollapsibleItem, Col, Tabs ,  Tab} from 'react-materialize'

export class EditBook extends React.Component{
    render(){
        return( 
                <div>
                    <h5> Edit Book </h5>
                <div>
                    
                    <Input label="Change Book Title" l={12} />
                    <Input label="Change Author's Name" l={12}/>
                    <div class="input-field">
                    <label for="textarea1">Change Description</label>
                        <textarea id="textarea1" class="materialize-textarea"></textarea>
                        
                    </div>
                    <Input type='select' label="Change Category"  l={12}>
                    <option value='1'>Horror</option>
                    <option value='2'>Fiction</option>
                    <option value='3'>Romance</option>
                    </Input>
                    <br/>
                    <br/>
                    <br/>
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Change Picture</span>
                            <input type="file"></input>
                        </div>
                        <br/>
                        <br/>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                    <Input s={12} l={8} type='select' label="Select Action (Edit / Delete)" >
                        <option value='1'>Edit</option>
                        <option value='2'>Delete</option>
                        
                    </Input>

                    <Col s={12} l={18} className="center">
                        <Button waves='light'>Submit</Button>
                    </Col>
                </div>
                </div>

        );
    }
}