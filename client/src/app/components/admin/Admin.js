import React from 'react'
import {Input, CollectionItem, Collection, Collapsible, Breadcrumb, MenuItem, CollapsibleItem, Col, Tabs , Tab} from 'react-materialize'
import {BrowserRouter as Router, Route,Switch } from 'react-router-dom'


import {Adminroot} from './Adminroot'
import {CreateBook} from './Createbook'
import {EditBook} from './EditBook'
import {ViewBooks} from './ViewBooks'

export class Admin extends React.Component{
    render(){
        return( 
                <div>
                    <Col l={4}>
                    <h4> Admin Panel </h4>
                    
                        <Collection>
                            <CollectionItem href='/admin'active >Catalog</CollectionItem>
                            <CollectionItem href='#' >User & Groups</CollectionItem>
                        </Collection>
                    </Col>
                    
                    <Col l={8}>
                    <div className='adminpanel'>
                    <Switch>
                    <Route exact path={'/admin'} component={Adminroot}/>
                    <Route path={'/admin/createbook'} component={CreateBook}/>
                    <Route path={'/admin/editbook'} component={EditBook}/>
                    <Route path={'/admin/viewbook'} component={ViewBooks}/>
                    </Switch>
                    </div>
                    </Col>
                    
                            
                        
                </div>

        );
    }
}