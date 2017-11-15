import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';


/**
 * @description Book component taking book props
 * @param {object} books
 * @return {object} list of books
 */
const Book = books => (

  <div className="col l3">
    <ReactTooltip />
    <div className="card" >
      {/* <a
          className="modal-trigger"
          role="button"
          href="#bookmodal"
          tabIndex="-1"
        > */}

      <div
        className="card-image"
        data-tip={`<h6>Title: ${books.title}</h6> <p>Author: ${books.author}</p>  <p>Category:${books.category}</p>`}
        data-html
      >
        <img
          src={books.image || 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507822148' +
            '/bookplaceholder_kdbixx.png'}
          alt={books.title}
        />

      </div>
      {/* </a> */}

    </div>
    {/* </a> */}

  </div>
);

Book.propTypes = {
  books: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string,
    index: PropTypes.number
  }))

};


export default Book;
