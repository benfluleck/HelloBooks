import React from 'react';
import { Row } from 'react-materialize';


/**
 * @description Component for Message for No Books
 * @class MessageforNoBooks
 */
const MessageforNoBooks = () => (
  <Row>
    <h3 className="center bold-text nobooks-message">
        You have not borrowed any books.
    </h3>
  </Row>
);
export default MessageforNoBooks;
