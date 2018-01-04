import React from 'react';
import Header from '../components/container/header/Header';

import UploadModal from
  '../components/presentation/common/modal/UploadModal';
import DisplayBookModal from './presentation/common/book/DisplayBookModal';


const Root = props => (
  <div className="root-wrapper">

    <Header />
    {props.children}
    <UploadModal />
    <DisplayBookModal />

  </div>
);


export default Root;
