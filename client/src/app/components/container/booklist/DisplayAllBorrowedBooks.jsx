import React from 'react';
import {connect} from 'react-redux';
import {Row, Preloader} from 'react-materialize';
import {Book} from '../../presentation/common/Book/DisplayBook.jsx';
import {fetchAllBooksbyId} from '../../../actions/fetchbooks';
import {PropTypes} from 'prop-types';



/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBorrowedBooks extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      limit: 8,
      offset: 0
    }
  }

  /**
   * @description dispatch actions that help populate the dashboard with books
   * fetch books for the current user
   * @method componentDidMount
   * @memberof LandingPage
   * @returns {void}
   */
  componentWillMount() {
    this
        .props
        .fetchAllBooksbyId(this.state.offset, this.state.limit)

  }

 /**
   * render Landing page component
   * @method render
   * @member LandingPage
   * @returns {object} component
   */
  render() {
    if (!this.props.books) {
      return <Preloader size='big' className="center-align"/>
    }
    const getAllBooks = this
    .props
    .books
    .map((book) => {
      return (<Book
        key={book.book.id}
        title={book.book.title}
        author
        ={book.book.author}
        category={book.book.category}
        description={book.book.description}
        image={book.book.bookimage}/>);
    });
    return (
            <div>
                {[...getAllBooks]}
            </div>
    );
  }

}

DisplayAllBorrowedBooks.PropTypes = {
  books: PropTypes.array,

};

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.borrowedbooks.books
  };
};

export default connect (mapStateToProps,{ fetchAllBooksbyId })(DisplayAllBorrowedBooks);
