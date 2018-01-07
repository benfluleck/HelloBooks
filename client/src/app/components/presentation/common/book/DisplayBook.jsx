import React from 'react';
import ReactTooltip from 'react-tooltip';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSelectedBook, fetchAllBooks } from
  '../../../../actions/fetchBooks';
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
   *
   * @param {object} props
   *
   * @memberOf Book
   */
  constructor(props) {
    super(props);
    this.handleBookClick = this
      .handleBookClick
      .bind(this);
    this.handleEdit = this
      .handleEdit
      .bind(this);
    this.handleDelete = this
      .handleDelete
      .bind(this);
  }
  /**
   * @description fetches the book with the specific id
   *
   * @method handleBookClick
   *
   * @param {object} book
   *
   * @returns {function} fetchSelectedBook
   *
   * @memberOf Book
   */
  handleBookClick() {
    this
      .props
      .fetchSelectedBook(this.props.book.id);
  }

  /**
   * @description Deletes a book from the library
   *
   * @method handleDelete
   *
   * @returns {void}
   *
   * @memberOf Book
   */
  handleDelete() {
    return swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      buttonsStyling: true,
      reverseButtons: true
    }).then(() => {
      this
        .props
        .deleteBookAction(this.props.book.id)
        .then((response) => {
          if
          (response.message === `${this.props.book.title} has been deleted`) {
            swal('Deleted!', 'Your book has been deleted.', 'success');
            this
              .props
              .fetchAllBooks(this.props.offset, this.props.limit);
          } else {
            swal('Cancelled', 'Your book is safe', 'error');
          }
        })
        .catch(() => {
          swal(
            'Operation Cancelled',
            'This book is safe from deletion', 'error'
          );
        });
    }).catch(() => {});
  }
  /**
   *
   *
   * @description Edit button click to edit a book
   *
   * @method handleEdit
   *
   * @memberof Book
   *
   * @param {object} book
   *
   * @returns {function} a function that fetches the book id
   */
  handleEdit() {
    this
      .props
      .fetchSelectedBook(this.props.book.id);
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
        <ReactTooltip/>
        <div>
          <div>
            {this.props.isAdmin === true ?
              (
                <div>
                  <a
                    href="#edit-admin-book-modal"
                    onClick={this.handleEdit}
                    className="#f57c00 btn-floating orange edit-btn-class waves-light darken-2 book-icons-1 modal-trigger">
                    <i className="material-icons">mode_edit</i>
                    Edit
                  </a>
                  <a
                    onClick={this.handleDelete}
                    className="#f57c00 btn-floating delete-book-btn waves-light orange darken-2 book-icons">
                    <i className="material-icons">delete</i>
                    Delete
                  </a>
                </div>
              ) :
              null}
          </div>
          <div className="card">
            <a
              className="modal-trigger"
              href="#book-modal"
              onClick={this.handleBookClick}
              tabIndex="-1">
              <div
                className="card-image"
                data-tip={`<h4>Title: ${this.props.book.title}</h4><hr/> 
                <p>Author: ${this.props.book.author}</p>
                 <p>Description:${this.props.book.description}</p>`}
                data-html
                data-class="booktip">
                <img src={this.props.book.bookImage}
                  alt={this.props.book.title}/>
              </div>
            </a>

          </div>

        </div>
      </div>
    );
  }
}

Book.propTypes = {
  isAdmin: PropTypes.bool,
  fetchSelectedBook: PropTypes.func.isRequired,
  fetchAllBooks: PropTypes.func,
  deleteBookAction: PropTypes.func.isRequired,
  offset: PropTypes.number,
  limit: PropTypes.number,
  book: PropTypes.object
};

Book.defaultProps = {
  offset: 0,
  limit: 8
};

export { Book };

const mapStateToProps = state => ({
  isAdmin: (state.userReducer.user) ?
    state.userReducer.user.isAdmin :
    false

});

export default connect(
  mapStateToProps,
  {
    deleteBookAction,
    fetchAllBooks,
    fetchSelectedBook
  }
)(Book);
