import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect }  from 'react-redux';
import { Modal, Button, Row, Col } from 'react-materialize';
import DisplayBook from './DisplayBook.jsx';
import { borrowbooks } from '../../../../actions/borrowbooks';

import 'react-datepicker/dist/react-datepicker.css';

// console.log(typeof(borrowedbooks));

/**
 * @description DisplayBookModal for the Books
 * @param {object} props.title
 * @param {object} props.image
 * @param {object} props.author
 * @param {object} props.category
 * @param {object} props.description
 * @return {component} Book Modal
 */
class DisplayBookModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      returndate: moment(),
      bookId:this.props.id
    }
  }
  
  handleChange = date => this.setState({ returndate: date });
  handleClick = (event) => {
    event.preventDefault();
    const dateString = this.state.returndate.format("YYYY-MM-DD")
    console.log({...this.state, returndate: dateString })
    this.
    props.
    borrowbooks({...this.state, returndate: dateString })
  }
  
  

render(){
  const isBorrowed = this.props.borrowedbooks.map(book => {
    return (book.bookid)
  
  });

  // console.log(isBorrowed) console.log(isBorrowed)<div>{!isBorrowed ? }
if(!this.props.isAuthenticated){
return(
  <Modal id={`modal-${this.props.id}`} fixedFooter header="Loan Book">
    <Row>
    <div className="loan-book">
      <Col m={12}l={6}>
        <div className="card-image modal-image">
          <img src={this.props.image} alt={this.props.title}/>
        </div>
      </Col>
      <Col  m={12} l={6}>  
        <div className="book-modal modal-title">Title: {this.props.title}</div>
        <hr/>
        <div className="book-modal">Author: {this.props.author}</div>
        <div className="book-modal">Category: {this.props.category}</div>
        <div className="book-modal">Description: {this.props.description}</div>
    
      </Col>
      </div>
    </Row>   
  </Modal>

)

}

else{
  return (
    <Modal id={`modal-${this.props.id}`} fixedFooter header="Loan Book" actions={<div>
      <Button className="loan-button" onClick={this.handleClick}> Loan </Button>  
      <Button className="return-button"> Return </Button></div>}>
      <Row>
      <div className="loan-book">
        <Col m={12}l={6}>
          <div className="card-image modal-image">
            <img src={this.props.image} alt={this.props.title}/>
          </div>
        </Col>
        <Col  m={12} l={6}>  
          <div className="book-modal modal-title">Title: {this.props.title}</div>
          <hr/>
          <div className="book-modal">Author: {this.props.author}</div>
          <div className="book-modal">Description: {this.props.description}</div>
          <div className="book-modal loan-status">Loan Status: </div>
          <DatePicker
            selected={this.state.returndate}
            onChange={this.handleChange.bind(this)}
            />
        </Col>
        </div>
      </Row>   
    </Modal>
  )
}
}
};

const mapStateToProps = state => ({
  borrowedbooks: state.bookReducer.borrowedbooks.books,
  books: state.bookReducer.books.books,
  isAuthenticated: !!state.userReducer.isAuthenticated
});


export default connect(mapStateToProps, {borrowbooks})(DisplayBookModal);
