import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Preloader } from 'react-materialize';
import  Book  from '../../presentation/common/book/DisplayBook.jsx';
import { fetchAllBooksbyId } from '../../../actions/fetchbooks';

import NoBooksMessage from '../../presentation/messages/NoBooksMessages.jsx';

/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBorrowedBooks extends React.Component {
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
  componentWillMount() {
    this.props.fetchAllBooksbyId(this.state.offset, this.state.limit);
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
    } else if (this.props.books.length === 0) {
      return <NoBooksMessage />;
    }
    const getAllBooks = this.props.books.map((book) => (
				<Book
					key={book.book.id}
					title={book.book.title}
					author={book.book.author}
					category={book.book.category}
					description={book.book.description}
					image={book.book.bookimage}
				/>
    ));
    return <div>{[...getAllBooks]}</div>;
  }
}
DisplayAllBorrowedBooks.PropTypes = {
  books: PropTypes.array
};

const mapStateToProps = (state) => ({ books: state.bookReducer.borrowedbooks.books });

export default connect(mapStateToProps, { fetchAllBooksbyId })(DisplayAllBorrowedBooks);
