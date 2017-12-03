import React from 'react';
import ReactTooltip from 'react-tooltip';

// import DisplayBookModal from './DisplayBookModal.jsx';

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
        href="#modal"
        onClick={() => {
        // $(`#modal-${books.id}`).modal('open');
        // const bookId = books.id;
        $('#modal').modal('open');
        $('#bookImage').attr('src', books.image);
        $('#bookTitle').text(books.title);
        $('#bookAuthor').text(books.author);
        $('#bookDescription').text(books.description);
        $('#bookId').text(books.id);
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
  </div>
);


export default Book;
