import React from 'react'
import css from '../css/style.scss'
import {Row} from 'react-materialize'


import {Header} from './Header';
import {Bottom} from './Bottom';


export class Root extends React.Component
{
    render() {
  return (
        <div className= 'root'>
            
                <Header/>
                       
            <Row>
                
                 {this.props.children}
                
            </Row>
           
                <Bottom/>
            
        </div>

   
  )
}
}