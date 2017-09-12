import React from 'react'
import css from '../css/style.scss'
import {Row,Col} from 'react-materialize'
import PropTypes from 'prop-types'

export const Welcome=(props)=>{
        if (props.isLoggedIn){
            return(

                <div className='welcome'>
                    <Col s={12} m={6} l={4}>
                        <div className='head'>
                        <h2>Welcome {props.name}</h2>       

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
                    <p>Hello {props.name}</p>
                </Col>
                </div>
            );
        
  

    }
     
}
Welcome.propTypes = {
    isLoggedIn: PropTypes.bool,
    name: PropTypes.string

};

Welcome.defaultProps= {
    name:'Guest',
    isLoggedIn: true
}