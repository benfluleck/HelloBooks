import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-materialize';
import NoNotificationsMessage from
  '../../presentation/messages/dashboardMessages/NoNotifications';

/**
 *
 * @class NotificationTable
 *
 * @extends {React.Component}
 */
const NotificationTable = ({ notificationList }) => {
  const notificationTableItems = notificationList.length > 0 ?
    notificationList.map(notification =>
      (
        <tr key={notification.id}>
          <td>{notification.user ? notification.user.username :
            'User not found'}
          </td>
          <td>{notification.book ? notification.book.title :
            'Book not found'}
          </td>
          <td>{notification.action || 'N/A'}
          </td>
        </tr>
      )) : <NoNotificationsMessage />;
  return (
    <Row>
      <div className="center loanhistory-table">
        <table className="centered highlight bordered history-table">
          <thead>
            <tr className="loan-header">
              <th>Username</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notificationTableItems}
          </tbody>
        </table>
      </div>
    </Row>
  );
};

NotificationTable.propTypes = {
  notificationList: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.object
  })).isRequired,
};


export default (NotificationTable);
