import React from 'react';
import { Row } from 'react-materialize';


/**
 * @description Component for Message for No Books
 * @class MessageforNoBooks
 */
const NoNotificationsMessage = () => (
  <Row>
    <h3 className="center bold-text nobooks-message">
        No Notifications Found.
    </h3>
  </Row>
);
export default NoNotificationsMessage;
