import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Modal } from 'react-materialize';
import  DisplayModal from './DisplayBookModal.jsx';

/**
 * @description Book component taking book props
 * @param {object} books
 * @return {object} list of books
 */
const Book = books => (
  <div className="col l3">
    <ReactTooltip/>
    <div className="card">
      <a
        className="modal-trigger"
        href={`#modal-${books.id}`}
        onClick={() => {
        $(`#modal-${books.id}`).modal('open')
      }}
        tabIndex="-1">
       <div
          className="card-image"
          data-tip={`<h4>Title: ${books.title}</h4><hr/> <p>Author: ${books.author}</p> <p>Category:${books.category}</p> <p>Description:${books.description}</p>`}
          data-html
          data-class="booktip">
          <img
            src={books.image || 'http://res.cloudinary.com/digpnxufx/image/upload/c_scale,h_499,w_325/v1507822148' +
            '/bookplaceholder_kdbixx.png'}
            alt={books.title}/>

        </div>
      </a>

    </div>
      <DisplayModal 
      title={books.title} 
      image={books.image} 
      category={books.category} 
      description= {books.description} 
      id={books.id}
      author={books.author}
      quantity={books.quantity}/>
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
