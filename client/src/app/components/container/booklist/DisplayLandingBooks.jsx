import React from 'react';
import {connect} from 'react-redux';
import {Book} from '../../presentation/common/Book/DisplayBook.jsx';
import  { fetchBooksforDashboard } from '../../../actions/fetchbooks';
import {PropTypes} from 'prop-types';
import {Row, Preloader} from 'react-materialize';


/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayLandingBooks extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      limit: 8,
      offset: 0
    }
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
      .fetchBooksforDashboard(this.state.offset, this.state.limit)
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
          key={book.id}
          title={book.title}
          author
          ={book.author}
          category={book.category}
          description={book.description}
          image={book.bookimage}/>);
      });
    return (
            <div>
                {[...getAllBooks]}
            </div>
    );
  }

}

DisplayLandingBooks.PropTypes = {
  books: PropTypes.array,

};

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books.books
  };
};

export default connect (mapStateToProps,{ fetchBooksforDashboard })(DisplayLandingBooks);
