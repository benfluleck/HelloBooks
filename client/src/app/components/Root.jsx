import React from 'react';
import Header from '../components/container/header/Header.jsx';

import UploadModal from
  '../components/presentation/common/modal/UploadModal.jsx';
import DisplayBookModal from './presentation/common/book/DisplayBookModal.jsx';
import EditBookModal from './presentation/common/modal/EditBookModal.jsx';
import AddBookModal from './presentation/common/modal/AddBookModal.jsx';


/* eslint-disable */
const Root = props => (
  <div className="root-wrapper">

    <Header />
    {props.children}
  <UploadModal />
  <EditBookModal />
 <DisplayBookModal />
 <AddBookModal />
 
  </div>
);


export default Root;
