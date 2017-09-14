import React from 'react'
import css from '../css/style.scss'
import { Row,Col } from 'react-materialize'
import PropTypes from 'prop-types'

export default class dashboard extends React.Component {
    render(){
        return(
            <div className='dashboard'>
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
       
     
}