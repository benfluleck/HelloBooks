import React from 'react';
import { Col, Row, ProgressBar } from 'react-materialize';

/**
 * @description Component for Progress Bar,
 *
 * @class ShowProgressBar
 */
const ShowProgressBar = () => (
  <Row>
    <Col l={4} s={4} m={4}>
          Loading....
      <ProgressBar />
    </Col>
  </Row>
);

export default ShowProgressBar;
