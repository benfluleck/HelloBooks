import React from 'react'
import {Input, CollectionItem, Collection, Collapsible, Breadcrumb, MenuItem, CollapsibleItem, Col, Tabs , Tab} from 'react-materialize'
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'


import {Adminroot} from './Adminroot'
import {CreateBook} from './Createbook'
import {EditBook} from './EditBook'
import {ViewBooks} from './ViewBooks'
import {Userlist} from './Userlist'
import {EditUser} from './EditUser'

export class Admin extends React.Component{
    render(){
        return( 
                <div>
                    <Col l={4}>
                    <h4> Admin Panel </h4>
                    
                        <Collection>
                            <CollectionItem href='/admin'active >Catalog</CollectionItem>
                            
                        </Collection>
                    </Col>
                    
                    <Col l={8}>
                    <div className='adminpanel'>
                    <Switch>
                        <Route exact path={'/admin'} component={Adminroot}/>
                        <Route exact path={'/admin/createbook'} component={CreateBook}/>
                        <Route exact path={'/admin/editbook'} component={EditBook}/>
                        <Route exact path={'/admin/viewbook'} component={ViewBooks}/>
                        <Route exact path={'/admin/edituser'} component={EditUser}/>
                        <Route exact path={'/admin/userlist'} component={Userlist}/>
                    </Switch>
                    </div>
                    </Col>
                    
                            
                        
                </div>

        );
    }
}