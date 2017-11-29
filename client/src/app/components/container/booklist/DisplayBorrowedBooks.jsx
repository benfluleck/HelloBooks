import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Preloader, Row, Col } from 'react-materialize';
import PaginationWrapper from '../common/Pagination.jsx';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import { fetchAllBooksbyId } from '../../../actions/fetchbooks';
import MessageforNoBooks from '../../presentation/messages/dashboardMessages/MessageforNoBooks.jsx';

/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBorrowedBooks extends React.Component {
  /**
   * Creates an instance of DisplayAllBorrowedBooks.
   * @param {any} props
   * @param {object} offset
   * @param {object} limit
   * @memberOf DisplayAllBorrowedBooks
   */
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0
    };
  }
  /**
   * @description dispatch actions that help populate the dashboard with books
   * fetch books for the current user
   * @method componentDidMount
   * @memberof LandingPage
   * @returns {void}
   */
  componentDidMount() {
    if (!this.props.borrowedBooks) {
      return <Preloader size="big" />;
    }
    this.props.fetchAllBooksbyId(this.state.offset, this.state.limit);
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
        id={book.book.id}
        key={book.book.id}
        title={book.book.title}
        author={book.book.author}
        description={book.book.description}
        quantity={book.book.quantity}
        image={book.book.bookimage}
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
          numberOfRecords={this.state.limit}
          fetch={this.props.fetchAllBooksbyId}
        />
      </div>);
  }
}
DisplayAllBorrowedBooks.propTypes = {
  borrowedBooks: PropTypes.shape({
    title: PropTypes.string,
    author: PropTypes.string,
    quantity: PropTypes.number,
    description: PropTypes.string,
    id: PropTypes.number,
    map: PropTypes.object,
    pagination: PropTypes.object,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      description: PropTypes.string,
    }))
  }),
  fetchAllBooksbyId: PropTypes.func.isRequired
};

DisplayAllBorrowedBooks.defaultProps = {
  borrowedBooks: null

};


const mapStateToProps = ({ bookReducer }) => ({
  borrowedBooks: bookReducer.borrowedBooksList
});

export default connect(mapStateToProps, { fetchAllBooksbyId })(DisplayAllBorrowedBooks);

