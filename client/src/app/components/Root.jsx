import React from 'react';
import Header from '../components/container/header/Header.jsx';
import UploadModal from '../components/presentation/common/modal/UploadModal.jsx';
// import BookCoverUpload from './presentation/common/modal/BookCoverUpload.jsx';


/* eslint-disable */
const Root = props => (
  <div className="root-wrapper">

    <Header />
    {props.children}
  <UploadModal />
    {/* <BookCoverU pload/> */}
  </div>
);


export default Root;
