import React from 'react'
import {  Col,Row, Card, CardTitle, Button, Modal } from 'react-materialize'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'



/*
eslint-disable
 */
export const Book  = (books) =>{
      return(
        <div className="col l3">
          <ReactTooltip/>
          <div className="card">
            <div className="card-image" data-tip={`Description: '${books.description} <br> More description about this` } data-multiline={true}>
              <img src={books.image}/>
            </div>
            <div className="card-content">
              <p>Title: {books.title}</p>
              <p>Category: {books.category}</p>
              <p>Author: {books.author}</p>

            </div>


          </div>

        </div>


            // <div>

            //     <Col m={7} s={12} l={5}>
            //       <Card className ='transparent'
            //       horizontal header={<CardTitle image={books.image}></CardTitle>}
            //       actions={[<a href='#'>More Information</a>]}>
            //           <p>Title: {books.title}</p>
            //           <p>Category: {books.category}</p>
            //           <p>Author: {books.author}</p>
            //           <p >Quantity: {books.quantity}</p>
            //           <Modal header={`${books.title}`} fixedFooter
            //           trigger={<Button>Loan</Button>} actions={[<a href='#'>Loan Book &nbsp;</a>]}>
            //           <p>Description: {books.description}</p>
            //           </Modal>
            //       </Card>
            //     </Col>


            // </div>

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
            index:PropTypes.number

        })
    )



}
