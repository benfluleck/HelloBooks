import React from 'react'
import {NavLink} from 'react-router-dom'
import {Input, CollectionItem, Collection, Collapsible, CollapsibleItem,  Col, Tabs , Tab} from 'react-materialize'

export class Adminroot extends React.Component{
    render(){
        return( 
                <div>
                    <Tabs className='tab-demo z-depth-1 transparent'>
                        <Tab title="Books" active>
                        <Collection>
                           <CollectionItem><NavLink to ='/admin/createbook'>Create Book </NavLink></CollectionItem>
                           <CollectionItem><NavLink to ='/admin/editbook'>Edit Book </NavLink></CollectionItem>
                           <CollectionItem><NavLink to ='/admin/viewbook'>View Books</NavLink></CollectionItem>
                            
                        </Collection>
                        </Tab>
                        <Tab title="Category">
                        <CollectionItem href='#'>Create New Category</CollectionItem>
                        <CollectionItem href='#'>Edit Category</CollectionItem>    

                        </Tab>
                       
                    </Tabs>   
                </div>

        );
    }
}