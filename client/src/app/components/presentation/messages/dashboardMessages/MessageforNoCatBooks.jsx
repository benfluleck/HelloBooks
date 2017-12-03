import React from 'react';
import { Row } from 'react-materialize';

/**
 * @description Component for Message for No Loan History
 * @class MessageforNoBooksHistory
 */
const MessageforNoCatBooks = () => (
  <Row>
    <h3 className="center bold-text nobooks-message">
       There are no books in this category
    </h3>
  </Row>
);
export default MessageforNoCatBooks;
