import React from 'react'
import css from '../css/style.scss'
import {Row,Col} from 'react-materialize'


export class Welcome extends React.Component{
   
    render(){
       const name = 'Guest'
        if (!this.props.isLoggedIn){
            return(

                <div className='welcome'>
                    <Col s={12} m={6} l={4}>
                        <div className='head'>
                        <h2>Welcome {name}</h2>       

                        <h4>Hello Books</h4>
                        <p>by Benny Ogidan</p>
                        </div>
                    </Col>
                </div>
            );
        }
        else{
            return(
                <div className='welcome'>
                <Col s={8} m={10} l={12}>
                    <p>Hello {name}</p>
                </Col>
                </div>
            );
        }
    };
}