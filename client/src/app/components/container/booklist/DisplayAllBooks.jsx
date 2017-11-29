import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Preloader, Col } from 'react-materialize';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import { fetchAllBooks } from '../../../actions/fetchbooks';
import PaginationWrapper from '../common/Pagination.jsx';
import SearchBooks from '../../presentation/common/book/SearchBooks.jsx';

/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBooks extends React.Component {
  /**
   * Creates an instance of DisplayAllBooks.
   * @param {any} props
   * @param {object} offset
   * @param {object} limit
   * @memberOf DisplayAllBooks
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
   * fetch books for the dashboard
   * @method componentDidMount
   * @memberof DisplayLandingBooks
   * @returns {void}
   */
  componentDidMount() {
    this.props.fetchAllBooks(this.state.offset, this.state.limit);
  }
  /**
   * render Display All Books page component
   * @method render
   * @member DisplayAllBooks
   * @returns {object} component
   */
  render() {
    if (!this.props.allBooksList) {
      return <Preloader size="big" className="center-align" />;
    }
    const getAllBooks =
this.props.allBooksList.books.map(book => (
  <Book
    key={book.id}
    id={book.id}
    title={book.title}
    author={book.author}
    description={book.description}
    image={book.bookImage}
    quantity={book.quantity}
  />
));
    const { pagination } = this.props.allBooksList;
    const config = {
      items: pagination.pageCount,
      activePage: pagination.page
    };
    return (
      <div>
        <Row>
          <SearchBooks />
        </Row>
        <Row>
          <Col l={12}>
            {
      [...getAllBooks]}
          </Col>
        </Row>
        <PaginationWrapper
          config={config}
          numberOfRecords={this.state.limit}
          fetch={this.props.fetchAllBooks}
        />
      </div>
    );
  }
}

DisplayAllBooks.propTypes = {
  allBooksList: PropTypes.shape({
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
  fetchAllBooks: PropTypes.func.isRequired
};

DisplayAllBooks.defaultProps = {
  allBooksList: null
};

const mapStateToProps = state => ({
  allBooksList: state.bookReducer.allBooksList,
});

export default connect(mapStateToProps, { fetchAllBooks })(DisplayAllBooks);
