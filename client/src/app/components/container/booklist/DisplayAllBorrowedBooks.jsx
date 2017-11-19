import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { Preloader,Pagination, Row, Col } from 'react-materialize';
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
      limit: 4,
      offset: 0
    };
    this.onSelect = this.onSelect.bind(this);
		this.onChange = this.onChange.bind(this);
  }

  onChange = (pagenumber) => {
		this.props.fetchAllBooksbyId(pageLimit, this.state.limit);
	};

	onSelect = (pagenumber) => {
		let pageOffset;
		if (pagenumber === 1) {
			pageOffset = 0;
		} else {
			pageOffset = pagenumber - 1;
		}
		let pageLimit = pageOffset * this.state.limit;
		this.setState({ offset: pageLimit });
		this.props.fetchAllBooksbyId(pageLimit, this.state.limit);
	};
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
    const getAllBooks = this.props.books.map((book) => {
      return (
				<Book
          id={book.book.id}
					key={book.book.id}
					title={book.book.title}
					author={book.book.author}
					category={book.book.category}
					description={book.book.description}
          quantity={book.book.quantity}
					image={book.book.bookimage}
				/>
      );
    });
    const page = this.props.pagination;
    return <div>
      <Row>
      <Col l={12}>
     <div className='borrowed-books'>
      {[...getAllBooks]}
      </div>
      </Col>
      </Row>
    <Row>
      <Pagination onSelect={this.onSelect} items={page.pageCount} activePage={page.page} maxButtons={5}/>
    </Row>
    </div>;
  }
}
DisplayAllBorrowedBooks.PropTypes = {
  books: PropTypes.array,
 
};

const mapStateToProps = (state) => ({ 
  books: state.bookReducer.borrowedbooks.books, 
  pagination: state.bookReducer.borrowedbooks.pagination });

export default connect(mapStateToProps, { fetchAllBooksbyId })(DisplayAllBorrowedBooks);
