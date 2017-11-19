import React from 'react';
import { connect } from 'react-redux';
import  Book  from '../../presentation/common/book/DisplayBook.jsx';
import { fetchAllBooks } from '../../../actions/fetchbooks';
import { PropTypes } from 'prop-types';
import { Row, Preloader, Pagination,Col } from 'react-materialize';

/**
 * @description Component for Display Books on the Landing page for all users
 * @class DisplayLandingBooks
 * @extends {Component}
 */
class DisplayAllBooks extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			limit: 8,
			offset: 0
		};
		this.onSelect = this.onSelect.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange = (pagenumber) => {
		this.props.fetchAllBooks(pageLimit, this.state.limit);
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
		this.props.fetchAllBooks(pageLimit, this.state.limit);
	};

	/**
   * @description dispatch actions that help populate the dashboard with books
   * fetch books for the dashboard
   * @method componentDidMount
   * @memberof DisplayLandingBooks
   * @returns {void}
   */
	componentDidMount() {
		this.props.fetchAllBooks(this.state.offset, this.state.limit);
	}
	/**
   * render Display All Books page component
   * @method render
   * @member Display All Books
   * @returns {object} component
   */
	render() {
		if (!this.props.books) {
			return <Preloader size="big" className="center-align" />;
		}

		const getAllBooks = this.props.books.map((book) => {
			return (
				<Book
					key={book.id}
        	id={book.id}
					title={book.title}
					author={book.author}
					category={book.category}
					description={book.description}
					image={book.bookimage}
					quantity={book.quantity}
				/>
			);
		});
		const page = this.props.pagination;
		return (
			<div>
			<Row>
      <Col l={12}>
      {
      [...getAllBooks]}
      </Col>
      </Row>
			<Row>
				<Pagination onSelect={this.onSelect} 
				items={page.pageCount} 
				activePage={page.page} maxButtons={5} />
			</Row>
			</div>
		);
	}
}

DisplayAllBooks.PropTypes = {
	books: PropTypes.array
};

const mapStateToProps = (state) => {
	return {
		books: state.bookReducer.books.books,
		pagination: state.bookReducer.books.pagination
	};
};

export default connect(mapStateToProps, { fetchAllBooks })(DisplayAllBooks);
