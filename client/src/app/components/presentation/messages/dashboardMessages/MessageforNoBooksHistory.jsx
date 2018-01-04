import React from 'react';
import { Row } from 'react-materialize';

/**
 * @description Component for Message for No Loan History
 *
 * @class MessageforNoBooksHistory
 */
const MessageforNoBooksHistory = () => (
  <Row>
    <h3 className="center bold-text nobooks-message">
       You have no loan history. Go and search our collection and loan some books
    </h3>
  </Row>
);
export default MessageforNoBooksHistory;

