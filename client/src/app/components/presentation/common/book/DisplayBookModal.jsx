import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { connect }  from 'react-redux';
import { Modal, Button, Row, Col } from 'react-materialize';
import DisplayBook from './DisplayBook.jsx';
import { borrowbooks } from '../../../../actions/borrowbooks';
import { returnbook } from '../../../../actions/returnbooks';

import 'react-datepicker/dist/react-datepicker.css';


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
      bookId:this.props.id,
      error:''
    }
  }
  
  handleChange = date => this.setState({ returndate: date });

  handleReturnClick = (event) =>{
    this.
    props.
    returnbook({...this.state});
    $(`#modal-${this.props.id}`).modal({opacity: 0})
}

  handleBorrowClick = (event) => {
    event.preventDefault();
    const dateString = this.state.returndate.format("YYYY-MM-DD")
    
    this.
    props.
    borrowbooks({...this.state, returndate: dateString })
    .then((response)=>{
      if(response.error)
        {
         return;
        }
          $(`#modal-${this.props.id}`).modal({opacity: 0})
      })
  }  


render(){
  const isBorrowed = (this.props.borrowedBooksList.books) ? this.props.borrowedBooksList.books.map(book => {
      return (book.bookid)
    }) : [];
  const loanstatus = isBorrowed.includes(this.state.bookId)

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
    <Modal id={`modal-${this.props.id}`} fixedFooter header="Loan Book" 
    actions={<div>{!loanstatus ?
      <Button className="loan-button" onClick={this.handleBorrowClick}> Loan </Button> : 
      <Button className="return-button" onClick={this.handleReturnClick}> Return </Button>}</div>}>
      <Row>
      <div className="loan-book">
        <Col m={12}l={6}>
          <div className="card-image">
            <img className="modal-image" src={this.props.image} alt={this.props.title}/>
          </div>
        </Col>
        <Col  m={12} l={6}>  
          <div className="book-modal modal-title">Title: {this.props.title}</div>
          <hr/>
          <div className="book-modal">Author: {this.props.author}</div>
          <div className="book-modal">Description: {this.props.description}</div>
          <div className="book-modal loan-status">Loan Status: {!loanstatus?<p> Available</p> : <p>On Loan</p>} </div>
          <div className="book-modal return-date"> Specify Return Date:
          <DatePicker
            selected={this.state.returndate}
            onChange={this.handleChange.bind(this)}
            />
            </div>
        </Col>
        </div>
      </Row>   
    </Modal>
  )
}
}
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  borrowedBooksList: state.bookReducer.borrowedBooksList
  
});




export default connect(mapStateToProps,{returnbook,borrowbooks})(DisplayBookModal);
