import React from 'react';
import Header from '../components/container/header/Header.jsx';

import UploadModal from '../components/presentation/common/modal/UploadModal.jsx';
import DisplayBookModal from './presentation/common/book/DisplayBookModal.jsx';


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
