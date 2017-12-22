import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row, Col, Button, Preloader } from 'react-materialize';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import Loader from './Loader.jsx';
import { fetchAllBooks } from '../../../actions/fetchBooks';
import { fetchAllCategories } from '../../../actions/fetchCategories';
import PaginationWrapper from '../common/Pagination.jsx';
import SearchBooks from '../../presentation/common/book/SearchBooks.jsx';
import CategoriesDropdownList from '../categories/CategoriesDropdownList.jsx';
import MessageforNoCatBooks from
  '../../presentation/messages/dashboardMessages/MessageforNoCatBooks.jsx';
import EditBookModal from '../../presentation/common/modal/EditBookModal.jsx';
import AddBookModal from '../../presentation/common/modal/AddBookModal.jsx';

/**
 * @description Component for Display Books on the Landing page for all users
 *
 * @class DisplayLandingBooks
 *
 * @extends {Component}
 */
class DisplayAllBooks extends React.Component {
  /**
   * @description dispatch actions that help
   *
   * populate the dashboard with all the books
   *
   * @method componentWillMount
   *
   * @memberof DisplayAllBooks
   *
   * @returns {component} Loader
   */
  componentWillMount() {
    // $('.modal').modal();
    $('body').css('background-color', '#ffff');
    this.props.fetchAllCategories();
    return (<Loader
      records={this.props.allBooksList}
      callback={this.props.fetchAllBooks(this.props.offset, this.props.limit)}
    />);
  }

  /**
   *
   * @method componentDidMount
   *
   * @memberof DisplayAllBooks
   *
   * @returns {void}
   *
   *
   * @memberOf DisplayAllBooks
  * */
  componentDidMount() {
    // $('.modal').modal();
  }

  // /**
  //  *
  //  * @returns {function} openAdminBook Modal
  //  *
  //  * @memberof DisplayAllBooks
  //  *
  //  */
  // handleClick() {
  //     $('#add-admin-book-modal').modal('open');

  // }


  /**
   * render Display All Books page component
   *
   * @method render
   *
   * @member DisplayAllBooks
   *
   * @returns {component} component
   */
  render() {
    if (!this.props.allBooksList.books) {
      return <Preloader size="big" />;
    }
    const getAllBooks =
      this.props.allBooksList.books.map(book => (
        <Book
          key={book.id}
          book={book}
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
            {this.props.isAdmin ?
              <div className="add-book">
                <Button
                  floating
                 // onClick={() => this.handleClick()}
                  className="#ef6c00 orange darken-3 add-book-btn modal-trigger"
                  href="#add-admin-book-modal"
                  waves="light"
                  icon="add"
                />
                ADD BOOK
              </div> : null
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
          numberOfRecords={this.props.limit}
        />
        <div>
          <EditBookModal />
          <AddBookModal />
        </div>
      </div>
    );
  }
}

DisplayAllBooks.propTypes = {
  offset: PropTypes.number,
  limit: PropTypes.number,
  isAdmin: PropTypes.bool,
  allBooksList: PropTypes.shape({
    id: PropTypes.number,
    map: PropTypes.object,
    pagination: PropTypes.object,
    books: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      author: PropTypes.string,
      quantity: PropTypes.number,
      description: PropTypes.string,
    }))
  }),
  fetchAllBooks: PropTypes.func.isRequired,
  fetchAllCategories: PropTypes.func.isRequired,
};

DisplayAllBooks.defaultProps = {
  allBooksList: {},
  limit: 8,
  offset: 0,
  isAdmin: false,
};

const mapStateToProps = state => ({
  allBooksList: state.bookReducer.allBooksList,
  isAdmin: (state.userReducer.user) ? state.userReducer.user.isAdmin : false,
});

export default connect(mapStateToProps, {
  fetchAllCategories,
  fetchAllBooks
})(DisplayAllBooks);

