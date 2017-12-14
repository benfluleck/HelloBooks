import React from 'react';
import PropTypes from 'prop-types';
import { Row, Button } from 'react-materialize';
import { connect } from 'react-redux';
import ChangeUserLvlModal from '../../presentation/common/modal/ChangeUserLevelModal.jsx';
import { getSelectedUser } from '../../../actions/admin/getSelectedUser';


/**
 *
 *
 * @class UserListTable
 * @extends {React.Component}
 */
class UserListTable extends React.Component {
  /**
    * @param {object} id
    * @memberof UserListTable
    * @returns {function} getSelectedUser
    * @memberOf UserListTable
   * */
  onClick(id) {
    this.props.getSelectedUser(id);
    $('#change-user-level-modal').modal('open');
  }
  /**
   *
   *
   * @returns {Component} Component
   * @memberof UserListTable
   *
   */
  render() {
    const { users } = this.props;
    const rows = this.props.users && this.props.users.length ? this.props.users.map(user => (
      <tr key={user.id}>
        <td className="book-cover-on-table"><img src={user.userImage || 'N/A'} alt={user.title} /></td>
        <td>{user.firstname || 'N/A'}</td>
        <td>{user.lastname || 'N/A'}</td>
        <td>{user.email || 'N/A'} </td>
        <td>{user.username || 'N/A'}</td>
        <td>{user.userLevel || 'N/A'}
          <Button
            floating
            icon="mode_edit"
            className="#f57c00 orange darken-2"
            waves="light"
            onClick={() => {
              this.onClick(user.id);
 }}
          >Edit
          </Button>
        </td>

      </tr>
    )) : null;
    return (rows ?
      <Row>
        <div className="center loanhistory-table">
          <table className="centered highlight bordered history-table">
            <thead>
              <tr className="loan-header">
                <th>Profile Pic</th>
                <th>First name</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Username</th>
                <th>UserLevel</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
          <ChangeUserLevelModal />
        </div>
      </Row> :
      null
    );
  }
}

UserListTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number
  })).isRequired,
  getSelectedUser: PropTypes.func.isRequired
};


export default connect(null, { getSelectedUser })(UserListTable);
