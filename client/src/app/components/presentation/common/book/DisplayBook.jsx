import React from 'react'
import { Col,Row, Card, CardTitle, Button, Modal } from 'react-materialize'
import PropTypes from 'prop-types'
import ReactTooltip from 'react-tooltip'


/**
 * @description Book component taking book props
 * @param {object} books
 * @return {object} list of books
 */
export const Book  = (books) =>{
      return(
        <div className="col l3">
        <ReactTooltip/>
          <div className="card">

            <div className="card-image"
            data-tip={`Title: ${books.title}<br/> Author: ${books.author}<br/> Category: ${books.category}<br/> ` } data-html={true} >
              <img src={books.image || 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507822148/bookplaceholder_kdbixx.png' } alt={books.title}/>
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
