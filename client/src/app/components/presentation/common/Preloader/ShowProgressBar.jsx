import React from 'react';
import {Col, Row, ProgressBar} from 'react-materialize';

const ShowProgressBar = () => (
  <Row>
    
      <Col l={4} s={4} m={4}>
          Loading....
        <ProgressBar/>
         
      </Col>
  </Row>
);

export default ShowProgressBar;
