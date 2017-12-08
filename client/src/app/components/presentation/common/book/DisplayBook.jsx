import React from 'react';
import ReactTooltip from 'react-tooltip';
import { Button } from 'react-materialize';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBook } from '../../../../actions/fetchbooks';
// import AdminBookModal from '../modal/AdminBookModal.jsx';
// import TestModal from '../modal/TestModal.jsx';

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
    this.handleClick = this.handleClick.bind(this);
    this.editClick = this.editClick.bind(this);
  }

  /**
   *
   *
   * @description fetches the book with the specific id
   * @param {object} book
   * @returns {function} fetchBook
   * @memberOf Book
   */
  handleClick(book) {
    this.props.fetchBook(book.id);
  }

  editClick(book){
   this.props.fetchBook(book.id);
   $('#admin-book-modal').modal('open');



  }

  componentDidMount () {
    this.setState({ header: 'Edit Book'});
  }
  
  /**
   *
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
          <div className="card">
            <a
              className="modal-trigger"
              href="#modal"
              onClick={() => this.handleClick(this.props.book)}

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
          <div>
            { this.props.isAdmin === true ?
            (
              <div>
                <Button onClick={() => this.editClick(this.props.book)} floating icon="mode_edit" className="#f57c00 orange darken-2" waves="light" style={{ bottom: '10px', right: '10px' }}>Edit</Button>
                <Button floating icon="delete" waves="light" className="#f57c00 orange darken-2" style={{ bottom: '10px', right: '10px' }}>Delete</Button>
              </div>) : null}
          </div>
        </div>
      </div>
    );
  }
}

Book.defaultProps = {
  book: null,
};

Book.propTypes = {

  isAdmin: PropTypes.bool.isRequired,
  fetchBook: PropTypes.func.isRequired,
  book: PropTypes.shape(PropTypes.arrayOf({
    title: PropTypes.string,
    author: PropTypes.string,
    quantity: PropTypes.string,
    description: PropTypes.string,
  })),
};

const mapStateToProps = state => ({
  isAdmin: (state.userReducer.user) ? state.userReducer.user.isAdmin : false

});


export default connect(mapStateToProps, { fetchBook })(Book);
