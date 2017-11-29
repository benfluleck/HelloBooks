import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Preloader, Row } from 'react-materialize';
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
   * Creates an instance of DisplayRecentBooks.
   * @param {any} props
   * @param {object} offset
   * @param {object} limit
   * @memberOf DisplayRecentBooks
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
  componentWillMount() {
    if (this.props.books) {
      return <Preloader size="big" className="center-align" />;
    }
    this
      .props
      .fetchAllRecentBooks(this.state.offset, this.state.limit);
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
  books: PropTypes.shape({
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
  fetchAllRecentBooks: PropTypes.func.isRequired,
  recentBooks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.integer
  }))
};
DisplayRecentBooks.defaultProps = {
  books: null,
  recentBooks: []
};

const mapStateToProps = ({ bookReducer }) => ({
  recentBooks: bookReducer.recentBooksList
});

export default connect(mapStateToProps, { fetchAllRecentBooks })(DisplayRecentBooks);
