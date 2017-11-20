import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


/**
 * Table of Loan history
 * @param {Object} props props object containing books
 * @returns {JSX} JSX representation of Books table
 */
const BorrowHistoryTable = (props) => {
  const rows = props.books && props.books.length ? props.books.map((book) => {
    const returned = book.BorrowedBook.returned;
    return (
      <tr key={book.book.id}>
        <td>{book.book.title || 'N/A'}</td>
        <td>{book.book.author || 'N/A'}</td>
        <td>{moment(book.book.createdAt).format('LLLL') || 'N/A'}</td>
        <td>{moment(book.book.returndate).format('LLLL') || 'N/A'}</td>
        <td>{moment(book.book.userReturndate).format('LLLL') || 'N/A'}</td>
        <td>{book.book.returnstatus ? 'Returned' : 'Unreturned'}</td>
      </tr>
    );
  }) : null;
  return (rows ?
    <div className="row">
      <div className="center" style={{ width: '95%', margin: 'auto' }}>
        <table className="centered bordered history-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Date Borrowed</th>
              <th>Date To Be Returned</th>
              <th>User Return Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    </div> :
    <div className="row">
      <div className="container">
        <h3 className="center bold-text" style={{ color: '#aaa' }}>
          You have no borrowing history. Head over to the library to get started
        </h3>
      </div>
    </div>
  );
};

BorrowHistoryTable.propTypes = {
  books: PropTypes.array.isRequired,
};


export default BorrowHistoryTable;
