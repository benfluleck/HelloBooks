import React from 'react'
import { NavLink } from 'react-router-dom'
import { Navbar, NavItem, Col,Row, Card, Tab, Tabs, CardTitle, Button, Modal } from 'react-materialize'
import PropTypes from 'prop-types'


/*
eslint-disable
 */


export const BorrowedBooks  = (props) =>{
        return(
            <div>
                  <Row>
                    <Col m={10} l={10}>
                        <Card className ='transparent' 
                        horizontal header={<CardTitle image={props.image}></CardTitle>} 
                        actions={[<a href='#'>More Information</a>]}>
                            <p>Title: {props.title}</p>
                            <p>Category: {props.category}</p>
                            <p>Author: {props.author}</p>
                            <p >Return Date: {props.return_date}</p>
                            <Modal header={`${props.title}`} fixedFooter
                            trigger={<Button>Return</Button>} actions={[<a href='#'>Return Borrowed Book &nbsp;</a>]}>
                            <p>Description: {props.description}</p>
                            </Modal>
                        </Card>
                    </Col>

                  </Row>
            </div>

        )
    
}

BorrowedBooks.propTypes ={

    borrrowed_books : PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            category: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            return_date: PropTypes.any.isRequired,
            description:PropTypes.string,
            id:PropTypes.number

        })
    )



}
