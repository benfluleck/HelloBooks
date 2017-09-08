import React from 'react'
import css from '../css/style.scss'
import {Row,Col} from 'react-materialize'


import {Header} from './Header';
import {Bottom} from './Bottom';


export class Root extends React.Component
{
    render() {
        const name ='Guest'
  return (
      
        <div className= 'root'>
            
                <Header/>
                
            
               <main> 
                   <Row>
                       <div className="container" >
                           
                            <Col s={12} m={6} l={6}>
                            <div className='head'>
                            <h2>Welcome {name}</h2>       
        
                            <h4>Hello Books</h4>
                            <p>by Benny Ogidan</p>
                            </div>
                            </Col>
                            
                            <Col s={12} m={6} l={4} offset='l1'>
                                {this.props.children}
                            </Col>
                     </div>
                 </Row>
                </main>
            
            
                <Bottom/>
            
        </div>

   
  )
}
}