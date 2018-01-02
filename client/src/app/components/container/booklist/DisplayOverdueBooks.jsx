import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'react-materialize';
import PaginationWrapper from '../common/Pagination';
import Loader from './Loader';
import Book from '../../presentation/common/book/DisplayBook';
import { fetchOverdueBookstoDashboard } from '../../../actions/fetchBooks';
import MessageforNoOverdueBooks from
  '../../presentation/messages/dashboardMessages/MessageforNoOverdueBooks';

/**
 * @description Component for Display Books on the Landing page for all users
 *
 * @class DisplayLandingBooks
 *
 * @extends {Component}
 */
class DisplayOverdueBooks extends React.Component {
  /**
   * @description dispatch actions that displays Overdue Books
   *
   * @method componentDidMount
   *
   * @memberof DisplayOverdueBooks
   *
   * @returns {void}
   */
  componentDidMount() {
    return (<Loader
      records={this.props.overdueBooks}
      callback={
        this.props.fetchOverdueBookstoDashboard(
          this.props.offset,
          this.props.limit
        )}
    />);
  }
  /**
   * render Landing page component
   *
   * @method render
   *
   * @member LandingPage
   *
   * @returns {object} component
   */
  render() {
    if (!this.props.overdueBooks ||
      this.props.overdueBooks.books.length === 0) {
      return <MessageforNoOverdueBooks />;
    }
    const getAllBooks = this.props.overdueBooks.books.map(book => (
      <Book
        key={book.book.id}
        book={book.book}
      />
    ));
    const { pagination } = this.props.overdueBooks;
    const config = {
      items: pagination.pageCount,
      activePage: pagination.page
    };

    return (
      <div>
        <Row>
          <Col l={12}>
            <div className="overdue-books">
              {[...getAllBooks]}
            </div>
          </Col>
        </Row>
        <PaginationWrapper
          config={config}
          numberOfRecords={this.props.limit}
          fetch={this.props.fetchOverdueBookstoDashboard}
        />
      </div>);
  }
}
DisplayOverdueBooks.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  overdueBooks: PropTypes.shape({
    id: PropTypes.number,
    map: PropTypes.object,
    pagination: PropTypes.object,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string
    }))
  }),
  fetchOverdueBookstoDashboard: PropTypes.func.isRequired

};

DisplayOverdueBooks.defaultProps = {
  overdueBooks: null,
  limit: 8,
  offset: 0

};


const mapStateToProps = ({ bookReducer }) => ({
  overdueBooks: bookReducer.overdueBooksList
});

export default connect(
  mapStateToProps,
  {
    fetchOverdueBookstoDashboard
  }
)(DisplayOverdueBooks);
