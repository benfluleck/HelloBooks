import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import { Button } from 'react-materialize';
import BookModal from './BookModal.jsx';
import { borrowBookAction } from '../../../../actions/borrowbooks';
import { returnBookAction } from '../../../../actions/returnbooks';


/**
 *
 *
 * @class DisplayBookModal
 * @extends {React.Component}

 *
 *
 * @class DisplayBookModal
 * @extends {React.Component}
 */
class DisplayBookModal extends React.Component {
  /**
   * Creates an instance of DisplayBookModal.
   * @param {object} props
   *
   * @memberOf DisplayBookModal
   */
  constructor(props) {
    super(props);
    this.state = {
      returnDate: moment()
    };
  }

  /**
   *
   * @param {param} date
   * @returns {state} state
   * @memberOf DisplayBookModal
   */
  handleChange = (date) => { this.setState({ returnDate: date }); }
  /**
   *
   *
   * @param {param} event
   * @returns {function} function
   * @memberOf DisplayBookModal
   */
  handleReturnClick = (event) => {
    this
      .props
      .returnBookAction({ bookId: this.props.book.id });
    $('#modal').modal({ opacity: 0 });
  }

  /**
   *
   *
   *
   * @param {param} loanStatus
   * @returns {Component} Component
   *
   * @memberOf DisplayBookModal
   */
  showDatePicker= (loanStatus) => {
    if (!loanStatus) {
      return (
        <div className="book-modal">
          <div className="loan-status">User Loan Status: <p className="loan-status-text">Available to You</p>
          </div>
          <div className="return-date"> Specify Return Date:
              <DatePicker
                selected={this.state.returnDate}
                onChange={this.handleChange.bind(this)}
                minDate={moment().add('days')}
                maxDate={moment().add(20, 'days')}
              />
          </div>
        </div>
      );
    }
    return (
      <div className="loan-status">User Loan Status: <p className="loan-status-text">Loaned</p>
      </div>

    );
  }

  /**
   *
   *
   * @param {event} event
   * @returns {function} borrowbooks
   * @memberOf DisplayBookModal
   */
  handleBorrowClick =(event) => {
    event.preventDefault();
    const dateString = this.state.returnDate.format('YYYY-MM-DD');
    this
      .props
      .borrowBookAction({ bookId: this.props.book.id, returnDate: dateString })
      .then((response) => {
        if (response.error) {
          return;
        }
        $('#modal').modal({ opacity: 0 });
      });
  }

  /**
   *
   *
   *
   * @param {param} loanStatus
   * @returns {Component} Component
   *
   * @memberOf DisplayBookModal
   */
  bookActions = (loanStatus) => {
    if (!loanStatus) {
      return (
        <div>
          <Button className="loan-button" onClick={this.handleBorrowClick}>
        Loan
          </Button>
        </div>
      );
    }
    return (
      <div>
        <Button className="return-button" onClick={this.handleReturnClick}>
        Return
        </Button>
      </div>
    );
  }
  /**
   *
   *
   * @description This render implements the isBorrowed logic checking
   *  whether a selected book has been borrowed
   * @memberof DisplayBookModal
   * @returns {Component} Component
   *
   * @memberOf DisplayBookModal
   */
  render() {
    if (!this.props.isAuthenticated) {
      return (
        <BookModal header="Book Details" books={this.props.book} />
      );
    }

    const isBorrowed = (this.props.borrowedBooksList.books) ? this.props.borrowedBooksList.books.map(book => (book.bookId)) : [];


    const loanStatus = isBorrowed.includes(this.props.book.id);

    const bookModalActions = this.bookActions(loanStatus);
    const chooseReturnDate = this.showDatePicker(loanStatus);
    return (

      <BookModal

        header="Loan Book"
        actions={bookModalActions}
        books={this.props.book}
      >
        {
        chooseReturnDate
      }
      </BookModal>
    );
  }
}


DisplayBookModal.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  borrowBookAction: PropTypes.func.isRequired,
  // book: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number
  // })).isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.userReducer.isAuthenticated,
  // isAdmin: state.userReducer.user.isAdmin,
  borrowedBooksList: state.bookReducer.borrowedBooksList || {},
  book: (state.bookReducer.book) ? state.bookReducer.book.book : [],
});


export default connect(
  mapStateToProps,
  {
    returnBookAction,
    borrowBookAction
  }
)(DisplayBookModal);
