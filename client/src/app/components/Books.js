import React from 'react';
import {NavLink} from 'react-router-dom';
import {
		Navbar,
		NavItem,
		Col,
		Row,
		Card,
		Tab,
		Tabs,
		CardTitle,
		Button,
		Modal,
		Pagination
} from 'react-materialize';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {fetchAllBooks} from '../actions/fetchbooks';
import {fetchAllBooksbyId} from '../actions/fetchbooks';

import {Book} from './Book';
import {BorrowedBooks} from './BorrowedBooks'

/*
eslint-disable
 */

class Books extends React.Component {
		constructor(props) {
				super(props);
				this.state = {
						limit: 3,
						offset: 0
				};
				this.onSelect = this
						.onSelect
						.bind(this);
				this.onChange = this
						.onChange
						.bind(this);
		}

		onChange = (pagenumber) => {
				// update state with new page of items let pageOffset; if (pagenumber === 1) {
				// 		pageOffset = 0; } else { 		pageOffset = pagenumber - 1; } let pageLimit =
				// ((pageOffset) * this.state.limit); // update state with new page of items
				// this.setState({offset: pageLimit});
				this
						.props
						.fetchAllBooksbyId(pageLimit, this.props.user.user, this.state.limit)

		}

		onSelect = (pagenumber) => {
				// update state with new page of items
				let pageOffset;
				if (pagenumber === 1) {
						pageOffset = 0;
				} else {
						pageOffset = pagenumber - 1;
				}
				let pageLimit = ((pageOffset) * this.state.limit);
				// update state with new page of items
				this.setState({offset: pageLimit});

				this
						.props
						.fetchAllBooks(pageLimit, this.state.limit);

		}

		componentWillMount() {
				this
						.props
						.fetchAllBooks(this.state.offset, this.state.limit)

				this
						.props
						.fetchAllBooksbyId(this.state.offset, this.props.user.user, this.state.limit)

		}
		render() {

				if (!this.props.books) {
						return <h5>Loading....</h5>
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
										quantity={book.quantity}
										description={book.description}
										image={book.book_image}/>);
						});
				const getAllborrowedBooks = this
						.props
						.borrowedbooks
						.books
						.map((book) => {
								return (<BorrowedBooks
										key={book.book.id}
										title={book.book.title}
										author={book.book.author}
										category={book.book.category}
										return_date={book.return_date}
										description={book.book.description}
										image={book.book.book_image}/>);
						});
				const page = this.props.pagination;
				return (
						<Col s={10} m={10} l={10} offset='l1'>
								<div className='books'>
										<Row>
												<h4>Books</h4>
												<Tabs className='books-tab z-depth-1 transparent'>
														<Tab title="All Books" active>
																<Pagination
																		onSelect={this.onSelect}
																		items={page.pageCount}
																		activePage={page.page}
																		maxButtons={5}/> {[...getAllBooks]}
														</Tab>
														<Tab title="Books On Loan">
																{/* <Pagination
																		onSelect={this.onSelect}
																		items={page.pageCount}
																		activePage={page.page}
																		maxButtons={3}/>  */}

																{[...getAllborrowedBooks]}

														</Tab>
														{/* <Tab title="Books To Return">
                        {[...returnedBooks]}
                    </Tab>
                    <Tab title="My Books">
                        {[...returnedBooks]}
                    </Tab> */}
												</Tabs>
										</Row>
								</div>
						</Col>
				)
		};
}

// Books.PropTypes = { 		books: PropTypes.array.isRequired }

const mapStateToProps = (state) => {
		console.log('this is my book', state.bookReducer.books.pagination);
		return {books: state.bookReducer.books.books, borrowedbooks: state.bookReducer.borrowedbooks, user: state.user, pagination: state.bookReducer.books.pagination}
}

export default connect(mapStateToProps, {fetchAllBooks, fetchAllBooksbyId})(Books);
