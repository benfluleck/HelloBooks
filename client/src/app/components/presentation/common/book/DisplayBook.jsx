import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

import DisplayBookModal from './DisplayBookModal.jsx';

/**
 * @description Book component taking book props
 * @param {object} books
 * @return {object} list of books
 */
const Book = books => (
  <div className="col l3">
    <ReactTooltip />
    <div className="card">
      <a
        className="modal-trigger"
        href={`#modal-${books.id}`}
        onClick={() => {
        $(`#modal-${books.id}`).modal('open');
      }}
        tabIndex="-1"
      >
        <div
          className="card-image"
          data-tip={`<h4>Title: ${books.title}</h4><hr/> <p>Author: ${books.author}</p> <p>Description:${books.description}</p>`}
          data-html
          data-class="booktip"
        >
          <img
            src={books.image}
            alt={books.title}
          />
        </div>
      </a>
    </div>
    {/* <DisplayBookModal
      title={books.title}
      image={books.image}
      category={books.category}
      description={books.description}
      id={books.id}
      author={books.author}
      quantity={books.quantity}
    /> */}
  </div>
);


export default Book;
