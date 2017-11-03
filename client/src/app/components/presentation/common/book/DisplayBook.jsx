import React from 'react'
import { Col,Row, Card, CardTitle, Button, Modal } from 'react-materialize'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'


/**
 * @description Book component taking book props
 * @param {*} books
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
