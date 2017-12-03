import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col } from 'react-materialize';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import Loader from './Loader.jsx';
import { fetchAllBooks } from '../../../actions/fetchbooks';
import PaginationWrapper from '../common/Pagination.jsx';
import SearchBooks from '../../presentation/common/book/SearchBooks.jsx';
import CategoriesDropdown from '../categories/CategoriesDropdown.jsx';
import getCategories from '../categories/getCategoriesWrapper.jsx';
import MessageforNoCatBooks from '../../presentation/messages/dashboardMessages/MessageforNoCatBooks.jsx';


const CategoriesDropdownList = getCategories(CategoriesDropdown);

/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBooks extends React.Component {
  /**
   * @description dispatch actions that help populate the dashboard with all the books
   * @method componentDidMount
   * @memberof DisplayAllBooks
   * @returns {component} Loader
   */
  componentWillMount() {
    return (<Loader
      records={this.props.allBooksList}
      callback={this.props.fetchAllBooks(this.props.offset, this.props.limit)}
    />);
  }
  /**
   * render Display All Books page component
   * @method render
   * @member DisplayAllBooks
   * @returns {component} component
   */
  render() {
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
          <Col m={9} l={9}>
            {this.props.allBooksList.books.length === 0 ?
                null : <SearchBooks />
          }
          </Col>
          <Col m={3} l={3}>
            <div className="catdropdownlist">
              <CategoriesDropdownList />
            </div>
          </Col>
        </Row>
        <Row>
          <Col l={12}>
            {this.props.allBooksList.books.length === 0 ?
              <MessageforNoCatBooks /> : null
           }
            {[...getAllBooks]}
          </Col>
        </Row>
        <PaginationWrapper
          config={config}
          fetch={this.props.fetchAllBooks}
        />
      </div>
    );
  }
}

DisplayAllBooks.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  allBooksList: PropTypes.shape({
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
  allBooksList: null,
  limit: 8,
  offset: 0
};

const mapStateToProps = state => ({
  allBooksList: state.bookReducer.allBooksList || [],
});

export default connect(mapStateToProps, { fetchAllBooks })(DisplayAllBooks);
