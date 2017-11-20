import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Preloader,Row } from 'react-materialize';
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
    if (!this.props.books) {
      return <Preloader size="big" className="center-align" />;
    }
    const getAllBooks = this
      .props
      .books
      .map(book => (<Book
        key={book.id}
        id={book.id}
        title={book.title}
        author={book.author}
        category={book.category}
        description={book.description}
        quantity={book.quantity}
        image={book.bookimage}
      />));
    return (
      <div>
        <Row>
        {[...getAllBooks]}
        </Row>
      </div>
    );
  }
}

DisplayLandingBooks.PropTypes = {
  books: PropTypes.array
};

const mapStateToProps = state => ({ 
  books: state.bookReducer.books.books 
});

export default connect(mapStateToProps, { fetchBooksforDashboard })(DisplayLandingBooks);
