import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'react-materialize';
import PaginationWrapper from '../common/Pagination.jsx';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import Loader from './Loader.jsx';
import { fetchAllBorrowedBooks } from '../../../actions/fetchBooks';
import MessageforNoBooks from
  '../../presentation/messages/dashboardMessages/MessageforNoBooks.jsx';

/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBorrowedBooks extends React.Component {
  /**
   * @description dispatch actions that help populate the dashboard with books
   * fetch books for the current user
   * @method componentDidMount
   * @memberof LandingPage
   * @returns {void}
   */
  componentDidMount() {
    return (<Loader
      records={this.props.borrowedBooks}
      callback=
        {this.props.fetchAllBorrowedBooks(this.props.offset, this.props.limit)}
    />);
  }
  /**
   * render Landing page component
   * @method render
   * @member LandingPage
   * @returns {object} component
   */
  render() {
    if (!this.props.borrowedBooks || this.props.borrowedBooks.books.length === 0) {
      return <MessageforNoBooks />;
    }
    const getAllBooks = this.props.borrowedBooks.books.map(book => (
      <Book
        key={book.book.id}
        book={book.book}
      />
    ));
    const { pagination } = this.props.borrowedBooks;

    const config = {
      items: pagination.pageCount,
      activePage: pagination.page
    };

    return (
      <div>
        <Row>
          <Col l={12}>
            <div className="borrowed-books">
              {[...getAllBooks]}
            </div>
          </Col>
        </Row>
        <PaginationWrapper
          config={config}
          fetch={this.props.fetchAllBorrowedBooks}
          numberOfRecords={this.props.limit}
        />
      </div>);
  }
}
DisplayAllBorrowedBooks.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  borrowedBooks: PropTypes.shape({
    map: PropTypes.object,
    pagination: PropTypes.object,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string
    }))
  }),
  fetchAllBorrowedBooks: PropTypes.func.isRequired
};

DisplayAllBorrowedBooks.defaultProps = {
  borrowedBooks: null,
  limit: 8,
  offset: 0

};

const mapStateToProps = ({ bookReducer }) => ({
  borrowedBooks: bookReducer.borrowedBooksList
});

export default connect(mapStateToProps, { fetchAllBorrowedBooks })(DisplayAllBorrowedBooks);

