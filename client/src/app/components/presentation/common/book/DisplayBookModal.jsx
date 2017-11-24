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

bookActions = (loanStatus) => {
  if (!loanStatus) 
    return (
      <div>
      <Button className="loan-button" onClick={this.handleBorrowClick}>
        Loan
      </Button>
      </div> 
    )
  else 
    return (
      <div>
      <Button className="return-button" onClick={this.handleReturnClick}>
        Return
      </Button>
      </div>
    )
}

showDatePicker =(loanStatus) =>{
  if(!loanStatus)
    return(
      <div className="book-modal">
        <div className="loan-status">User's Loan Status: <p className="loan-status-text">Available to You</p>
        </div>
            <div className="return-date"> Specify Return Date:
              <DatePicker
                selected={this.state.returndate}
                onChange={this.handleChange.bind(this)}
                minDate={moment().add('days')}
                maxDate={moment().add(20, 'days')}
                />
            </div>
      </div>
    )
else
  return(
      <div className="loan-status">User's Loan Status: <p className="loan-status-text">Loaned</p> 
      </div>
    
  )

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
    if(!this.props.isAuthenticated){
    return(
      <BookModal {...this.props}/>
      )
    }

else{
  const isBorrowed = (this.props.borrowedBooksList.books) ? this.props.borrowedBooksList.books.map(book => {
      return (book.bookid)
    }) : [];
  const loanStatus = isBorrowed.includes(this.state.bookId)

  const bookModalActions = this.bookActions(loanStatus)
  const chooseReturnDate = this.showDatePicker(loanStatus)



  return (
    <BookModal actions={bookModalActions} {...this.props}>
      {
        chooseReturnDate
      }
    </BookModal>
  )
}
}
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  borrowedBooksList: state.bookReducer.borrowedBooksList
  
});




export default connect(mapStateToProps,{returnbook,borrowbooks})(DisplayBookModal);


class BookModal extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    const { id,image,author,category,description,title,header,actions } = this.props;
    return(
    <Modal id={`modal-${id}`} fixedFooter header='Something Nice' actions={actions}>
      <Row>
      <div className="loan-book">
        <Col m={12}l={6}>
          <div className="card-image" >
            <img className="modal-image" src={image} alt={title}/>
          </div>
        </Col>
        <Col  m={12} l={6}>  
          <div className="book-modal modal-title">Title: {title}</div>
          <hr/>
          <div className="book-modal">Author: {author}</div>
          <div className="book-modal">Category: {category}</div>
          <div className="book-modal">Description: {description}</div>   
        </Col>
        </div>
        {this.props.children}
      </Row>   
    </Modal>
    ) 
  }

}



