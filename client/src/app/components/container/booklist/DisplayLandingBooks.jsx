import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Preloader, Row } from 'react-materialize';
import Book from '../../presentation/common/book/DisplayBook.jsx';
import { fetchBooksforDashboard } from '../../../actions/fetchbooks';


/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component} DisplayLandingBooks
 * @param {object} props
 * @param {object} state
 * @param {number} limit
 * @param {number} offset
 * @return {Component} DisplayLandingBooks
 */
class DisplayLandingBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0,
      isLoading: false
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
    this.setState({ isFetching: true });
    if (this.props.books) {
      return;
    }
    this
      .props
      .fetchBooksforDashboard(this.state.offset, this.state.limit);
  }
  /**
   * render Landing page component
   * @method render
   * @member LandingPage
   * @returns {object} component
   */
  render() {
    const fetchingState = this.props.isFetching ?
      <Preloader size="big" className="center-align" /> : null;
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
          category={book.category}
          description={book.description}
          quantity={book.quantity}
          image={book.bookimage}
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

DisplayLandingBooks.PropTypes = {
  books: PropTypes.array
};

DisplayLandingBooks.defaultProps = {
  books: null,
};

const mapStateToProps = ({ bookReducer }) => ({
  recentBooks: bookReducer.recentBooksList,
  isFetching: bookReducer.fetchingBooks
});

export default connect(mapStateToProps, { fetchBooksforDashboard })(DisplayLandingBooks);
