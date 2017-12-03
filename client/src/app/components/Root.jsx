import React from 'react';
import Header from '../components/container/header/Header.jsx';

import UploadModal from '../components/presentation/common/modal/UploadModal.jsx';
// import BookCoverUpload from './presentation/common/modal/BookCoverUpload.jsx';
import DisplayBookModal from './presentation/common/book/DisplayBookModal.jsx';


// const Modal = ({image, title, author, category, description}) => (
//   <div>
//       <div id="modal" className="modal">
//     <div className="modal-content">
//       <h4>Modal Header</h4>
//       <p>A bunch of text</p>
//     </div>
//     <Col m={12}l={6}>
//       <div className="card-image" >
//         <img className="modal-image" id="bookImage" alt={title} />
//       </div>
//     </Col>
//     <Col m={12} l={6}>
//       <div className="book-modal modal-title">Title: <span id="title" /></div>
//       <hr />
//       <div className="book-modal">Author: {author}</div>
//       <div className="book-modal">Category: {category}</div>
//       <div className="book-modal">Description: {description}</div>
//     </Col>
//     <div className="modal-footer">
//     <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
//     </div>
//   </div>
//   </div>

// );

/* eslint-disable */
const Root = props => (
  <div className="root-wrapper">

    <Header />
    {props.children}
  <UploadModal />
 <DisplayBookModal />
  </div>
);


export default Root;
