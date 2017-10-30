import React from 'react'
import {Row} from 'react-materialize'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { fetchBooksforDashboard }  from '../../actions/fetchbooks';

import {Book} from '../presentation/common/Book/DisplayBook';



/*
eslint-disable
 */
class LandingPage extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0
    };
  }
	componentWillMount() {
    this
        .props
        .fetchBooksforDashboard(this.state.offset, this.state.limit)
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
              description={book.description}
              image={book.bookimage}/>);
      });
    return (
    <Row>
  <div className='body-wrapper'>
    <div className='overlay-main'>
      <Row>
        <div className='overlay'>
          <h3>Latest Books Available: </h3>
          <hr/>
          <h5> To Loan Login </h5>

            <p>Click a book for a look at the description</p>
              {[...getAllBooks]}

        </div>
  </Row>
        </div>
  </div>
    </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books.books,
    pagination: state.bookReducer.books.pagination
  };
};

export default connect (mapStateToProps,{ fetchBooksforDashboard })(LandingPage);
