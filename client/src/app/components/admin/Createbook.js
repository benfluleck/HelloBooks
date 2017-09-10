import React from 'react'
import {Input, CollectionItem, Collection, Collapsible, Button, CollapsibleItem, Col, Tabs ,  Tab} from 'react-materialize'

export class CreateBook extends React.Component{
    render(){
        return( 
                <div>
                    <h5> Create Book </h5>
                <div>
                    
                    <Input label="Enter Book Title"  l={12} />
                    <Input label="Author's Name" l={12} />
                    <div class="input-field">
                    <label for="textarea1">Description</label>
                        <textarea id="textarea1" class="materialize-textarea"></textarea>
                        
                    </div>
                    <Input type='select' label="Category" defaultValue='2' l={12} >
                    <option value='1'>Horror</option>
                    <option value='2'>Fiction</option>
                    <option value='3'>Romance</option>
                    </Input>
                    
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Picture</span>
                            <input type="file"></input>
                        </div>
                        <br/>
                        <br/>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"></input>
                        </div>
                    </div>
                    <Col s={12} l={8}  className="center">
                        <Button waves='light'>Submit</Button>
                    </Col>
            
                </div>
                </div>

        );
    }
}