

import React from 'react'
import {NavLink} from 'react-router-dom'
import {Navbar, NavItem, Col,Row, Card, Tab, Tabs, CardTitle, Button, Modal} from 'react-materialize'
import  book1 from '../img/book1.jpg'
import book2 from '../img/book2.jpg'
import PropTypes from 'prop-types'





export const Book  = (props) =>{
       
        return(
            <div>
                  <Row>
                    <Col m={10} l={10}>
                        <Card className ='transparent' 
                        horizontal header={<CardTitle image={book1}></CardTitle>} 
                        actions={[<a href='#'>More Information</a>]}>
                            <p>Title: {props.title}</p>
                            <p>Category: {props.category}</p>
                            <p>Author: {props.author}</p>
                            <p >Quantity: {props.quantity}</p>
                            <Modal header={`${props.title}`} fixedFooter
                            trigger={<Button>Loan</Button>} actions={[<a href='#'>Loan Book &nbsp;</a>]}>
                            <p>Description: {props.description}</p>
                            </Modal>
                        </Card>
                    </Col>

                  </Row>
            </div>

        )
    
}

Book.propTypes ={

    books : PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            description:PropTypes.string,
            id:PropTypes.number

        })
    )



}
