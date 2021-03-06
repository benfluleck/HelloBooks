import React from 'react';
import { connect } from 'react-redux';
import { Preloader } from 'react-materialize';
import PropTypes from 'prop-types';
import { getAdminNotificationAction } from
  '../../../actions/admin/getAdminNotifications';
import PaginationWrapper from '../common/Pagination';
import NotificationTable from './NotificationTable';

/**
 * @description handles the state of the NotificationTab
 *
 * @class NotificationTab
 *
 * @extends {React.Component}
 */
class NotificationTab extends React.Component {
  /**
   * @description Notifications are populated in this tab
   *
   * @method componentDidMount
   *
   * @memberof NotificationTab
   *
   * @returns {void}
   */
  componentDidMount() {
    this.props.getAdminNotificationAction(this.props.offset, this.props.limit);
  }
  /**
   * render Notification Tab component
   *
   * @method render
   *
   *  @member NotificationTab
   *
   * @returns {object} component
   */
  render() {
    if (!this.props.notifications) {
      return <Preloader size="big" className="center-align" />;
    }
    const { pagination } = this.props.notifications;
    const config = {
      items: pagination.pageCount,
      activePage: pagination.page
    };
    return (
      <div>
        <NotificationTable
          notificationList={this.props.notifications.notifications}
        />
        <PaginationWrapper
          config={config}
          fetch={this.props.getAdminNotificationAction}
          numberOfRecords={this.props.limit}
        />
      </div>
    );
  }
}

NotificationTab.propTypes = {
  notifications: PropTypes.PropTypes.shape({
    pagination: PropTypes.object,
    notifications: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number
    }))
  }),
  getAdminNotificationAction: PropTypes.func.isRequired,
  limit: PropTypes.number,
  offset: PropTypes.number

};


NotificationTab.defaultProps = {
  notifications: null,
  limit: 5,
  offset: 0
};

const mapStateToProps = state => ({
  notifications: state.notifierReducer.notifications
});

export default
connect(
  mapStateToProps,
  { getAdminNotificationAction }
)(NotificationTab);
