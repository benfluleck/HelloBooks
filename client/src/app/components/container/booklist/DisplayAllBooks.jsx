import React from 'react';
import { connect } from 'react-redux';
import  Book  from '../../presentation/common/book/DisplayBook.jsx';
import { fetchAllBooks } from '../../../actions/fetchbooks';
import { PropTypes } from 'prop-types';
import { Row, Preloader, Pagination,Col } from 'react-materialize';
import PaginationWrapper from '../common/Pagination.jsx'

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
	}

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
		if (!this.props.allBooksList) {
			return <Preloader size="big" className="center-align" />;
		}

		const getAllBooks =
			this.props.allBooksList.books.map((book) => {
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
		const { pagination } = this.props.allBooksList;
		const config = { items: pagination.pageCount, 
                    activePage: pagination.page
                  };

		return (
			<div>
			<Row>
      <Col l={12}>
      {
      [...getAllBooks]}
      </Col>
      </Row>
			<PaginationWrapper config={config} 
                         numberOfRecords={this.state.limit}
                         fetch={this.props.fetchAllBooks}
												 />

			</div>
		);
	}
}

DisplayAllBooks.propTypes = {
	allBooksList: PropTypes.object
};

DisplayAllBooks.defaultProps = {
	allBooksList: null
};

const mapStateToProps = (state) => {
	return {
		allBooksList: state.bookReducer.allBooksList,
	};
};

export default connect(mapStateToProps, { fetchAllBooks })(DisplayAllBooks);
