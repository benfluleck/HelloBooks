import React from 'react';
import ReactTooltip from 'react-tooltip';
import swal from 'sweetalert2';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBook } from '../../../../actions/fetchbooks';
import { deleteBookAction } from '../../../../actions/admin/books';

/**
 *
 *
 *
 * @class Book
 * @extends {React.Component}
* */
class Book extends React.Component {
  /**
   * Creates an instance of Book.
   * @param {object} props
   *
   * @memberOf Book
   */
  constructor(props) {
    super(props);
    this.handleBookClick = this.handleBookClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  /**
   * @description fetches the book with the specific id
   * @method handleBookClick
   * @param {object} book
   * @returns {function} fetchBook
   * @memberOf Book
   */
  handleBookClick(book) {
    this.props.fetchBook(book.id);
  }

  /**
   * @description Deletes a book from the library
   * @method handleDelete
   * @param {object} id
   * @returns {function} id
   * @memberOf Book
   */
  handleDelete(id) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      // confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result) {
        this.props.deleteBookAction(id);
        this.props.fetchAllBooks(this.props.offset, this.props.limit);
        swal(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        );
        // result.dismiss can be 'cancel', 'overlay',
        // 'close', and 'timer'
      } else {
        swal(
          'Cancelled',
          'Your book is safe',
          'error'
        );
      }
    });
  }
  /**
   *
   *
   * @description Edit button click
   * @method handleEdit
   * @memberof Book
   * @param {object} book
   * @returns {function} a function that fetches the book id
   */
  handleEdit(book) {
    this.props.fetchBook(book.id);
    $('#admin-book-modal').modal('open');
  }
  /**
   *
   *
   * @returns {Component} Book
   *
   * @memberOf Book
   */
  render() {
    return (
      <div className="col l3">
        <ReactTooltip />
        <div>
          <div>
            { this.props.isAdmin === true ?
            (
              <div>
                <Button onClick={() => this.handleEdit(this.props.book)} floating icon="mode_edit" className="#f57c00 orange darken-2 book-icons-1" waves="light" >Edit</Button>
                <Button onClick={() => this.handleDelete(this.props.book.id)} floating icon="delete" waves="light" className="#f57c00 orange darken-2 book-icons">Delete</Button>
              </div>) : null}
          </div>
          <div className="card">
            <a
              className="modal-trigger"
              href="#modal"
              onClick={() => this.handleBookClick(this.props.book)}

              tabIndex="-1"
            >

              <div
                className="card-image"
                data-tip={`<h4>Title: ${this.props.book.title}</h4><hr/> <p>Author: ${this.props.book.author}</p> <p>Description:${this.props.book.description}</p>`}
                data-html
                data-class="booktip"
              >
                <img
                  src={this.props.book.bookImage}
                  alt={this.props.book.title}
                />
              </div>
            </a>

          </div>

        </div>
      </div>
    );
  }
}


Book.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  fetchBook: PropTypes.func.isRequired,
  fetchAllBooks: PropTypes.func,
  deleteBookAction: PropTypes.func.isRequired,
  offset: PropTypes.number,
  limit: PropTypes.number,
  // book: PropTypes.shape(PropTypes.arrayOf({
  //   title: PropTypes.string,
  //   author: PropTypes.string,
  //   quantity: PropTypes.string,
  //   description: PropTypes.string,
  // })),
};

Book.defaultProps = {
  offset: 0,
  limit: 8,
  // book: null,
  fetchAllBooks: null
};

const mapStateToProps = state => ({
  isAdmin: (state.userReducer.user) ? state.userReducer.user.isAdmin : false

});


export default connect(
  mapStateToProps,
  { deleteBookAction, fetchBook }
)(Book);
