import React from 'react'
import css from '../css/style.scss'
import { Row,Col } from 'react-materialize'


import { Header } from './Header';
import { Bottom } from './Bottom';
import { Welcome } from './Welcome';


export class Root extends React.Component
{
  
    render() {
        
    return (
      
        <div className= 'root'>
            
                <Header/>
               <main> 
                   <Row>
                    <div className="container" >   
                        <Welcome />
                        <Col s={12} m={8} l={6} offset='l1'>
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