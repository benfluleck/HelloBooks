import React from 'react';
import PropTypes from 'prop-types';
import { Row, Icon, Button } from 'react-materialize';

/**
 * Table of Loan history
 * @param {Object} props props object containing books
 * @returns {JSX} JSX representation of Books table
 */
const UserListTable = (props) => {
  const rows = props.users && props.users.length ? props.users.map((user, index) => (
    <tr key={index}>
      <td className="book-cover-on-table"><img src={user.userImage || 'N/A'} alt={user.title} /></td>
      <td>{user.firstname || 'N/A'}</td>
      <td>{user.lastname || 'N/A'}</td>
      <td>{user.email || 'N/A'} </td>
      <td>{user.username || 'N/A'}</td>
      <td>{user.userLevel || 'N/A'} <Button floating icon="mode_edit" className="#f57c00 orange darken-2" waves="light" >Edit</Button></td>
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
      </div>
    </Row> :
    null
  );
};

UserListTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    index: PropTypes.number
  })).isRequired,
};


export default UserListTable;
