import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Row } from 'react-materialize';
import Loader from './Loader.jsx';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import { fetchAllRecentBooks } from '../../../actions/fetchbooks';


/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {React.Component} DisplayLandingBooks
 * @return {Component} DisplayLandingBooks
 */
class DisplayRecentBooks extends React.Component {
  /**
   * @description dispatch actions that help populate the dashboard with books
   * fetch books for the dashboard
   * @method componentDidMount
   * @memberof DisplayLandingBooks
   * @returns {void}
   */
  componentDidMount() {
    return (<Loader
      records={this.props.books}
      callback={this.props.fetchAllRecentBooks(this.props.offset, this.props.limit)}
    />);
  }
  /**
   * render Display Recent component
   * @method render
   * @member DisplayRecentBooks
   * @returns {object} component
   */
  render() {
    const getAllBooks = (this
      .props
      .recentBooks) ? this
        .props
        .recentBooks
        .map(book => (<Book
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          description={book.description}
          quantity={book.quantity}
          image={book.bookImage}
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
  books: PropTypes.shape({
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
  fetchAllRecentBooks: PropTypes.func.isRequired,
  recentBooks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.integer
  }))
};
DisplayRecentBooks.defaultProps = {
  books: {},
  recentBooks: [],
  limit: 8,
  offset: 0
};

const mapStateToProps = ({ bookReducer }) => ({
  recentBooks: bookReducer.recentBooksList
});

export default connect(mapStateToProps, { fetchAllRecentBooks })(DisplayRecentBooks);
