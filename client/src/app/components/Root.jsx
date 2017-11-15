import React from 'react';
import Header from '../components/container/header/Header.jsx';
import UploadModal from './container/modal/UploadModal.jsx';
// import BookCoverUpload from './presentation/common/modal/BookCoverUpload.jsx';


/* eslint-disable */
const Root = props => (
  <div className="root-wrapper">

    <Header />
    {props.children}
    <UploadModal />
    {/* <BookCoverUpload/> */}
  </div>
);


export default Root;
