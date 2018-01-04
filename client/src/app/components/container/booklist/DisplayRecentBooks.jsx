import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row } from 'react-materialize';
import Loader from './Loader';
import Book from '../../presentation/common/book/DisplayBook';
import { fetchAllRecentBooks,
  fetchAllBorrowedBooks } from '../../../actions/fetchBooks';


/**
 * @description Component for Display Books on the Landing page for all users
 *
 * @class DisplayLandingBooks
 *
 * @extends {React.Component} DisplayLandingBooks
 *
 * @return {Component} DisplayLandingBooks
 */
class DisplayRecentBooks extends React.Component {
  /**
   * @description dispatch actions that help populate the dashboard with books
   * fetch books for the dashboard
   *
   * @method componentDidMount
   *
   * @memberof DisplayLandingBooks
   *
   * @returns {void}
   */
  componentDidMount() {
    $('body').css('background-color', 'rgb(204, 204, 204)');
    return (<Loader
      records={this.props.books}
      callback={this.props.fetchAllRecentBooks(
        this.props.offset,
        this.props.limit
      )}
    />);
  }

  /**
   * render Display Recent component
   *
   * @method render
   *
   * @member DisplayRecentBooks
   *
   * @returns {object} component
   */
  render() {
    this.props.fetchAllBorrowedBooks(
      this.props.offset,
      this.props.limit
    );
    const getAllBooks = (this
      .props
      .recentBooks) ? this
        .props
        .recentBooks
        .map(book => (<Book
          onClick={this.handleClick}
          key={book.id}
          book={book}
        />)) : [];

    return (
      <div className="recent-books">
        <Row>
          <div className="landing-page-image">
            {[...getAllBooks]}
          </div>
        </Row>
      </div>
    );
  }
}

DisplayRecentBooks.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  books: PropTypes.object,
  fetchAllRecentBooks: PropTypes.func.isRequired,
  recentBooks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number
  }))
};

export { DisplayRecentBooks };

DisplayRecentBooks.defaultProps = {
  limit: 8,
  offset: 0
};

const mapStateToProps = ({ bookReducer }) => ({
  recentBooks: bookReducer.recentBooksList
});

export default connect(
  mapStateToProps,
  {
    fetchAllRecentBooks,
    fetchAllBorrowedBooks
  }
)(DisplayRecentBooks);
