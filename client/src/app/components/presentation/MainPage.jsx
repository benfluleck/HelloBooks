import React from 'react';
import {Row, Preloader} from 'react-materialize';
import PropTypes from 'prop-types';
import { fetchAllBooks }  from '../../actions/fetchbooks';
import {connect} from 'react-redux';
import {Book} from '../presentation/common/Book/DisplayBook.jsx';

class MainPage extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
      limit: 8,
      offset: 0
    };
  }
  componentDidMount() {
    this
      .props
      .fetchAllBooks(this.state.offset, this.state.limit)
  }
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
        <div className ='main-wrapper'>
          <Row>
          <div className= 'main-text'>
                <h1>Main Page</h1>
                {[...getAllBooks]}
          </div>
          </Row>
        </div>
    <Row>

      </Row>
</div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.bookReducer.books.books
  };
};

export default connect (mapStateToProps,{ fetchAllBooks})(MainPage);
