import React from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBook } from '../../../../actions/fetchbooks';


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
    this.state = {

    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(books) {
    this.props.fetchBook(books.id);
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
        <div className="card">
          <a
            className="modal-trigger"
            href="#modal"
            onClick={() => this.handleClick(this.props.books)}

            tabIndex="-1"
          >
            <div
              className="card-image"
              data-tip={`<h4>Title: ${this.props.books.title}</h4><hr/> <p>Author: ${this.props.books.author}</p> <p>Description:${this.props.books.description}</p>`}
              data-html
              data-class="booktip"
            >
              <img
                src={this.props.books.bookImage}
                alt={this.props.books.title}
              />
            </div>
          </a>
        </div>
      </div>
    );
  }
}

Book.defaultProps = {
  // quantity: null,
  children: null,
  header: '',
  actions: null
};


Book.propTypes = {
  //  quantity: PropTypes.number
  children: PropTypes.func,
  books: PropTypes.shape(PropTypes.arrayOf({
    title: PropTypes.string,
    author: PropTypes.string,
    quantity: PropTypes.number,
    description: PropTypes.string,
  })).isRequired,
  header: PropTypes.string,
  actions: PropTypes.func,
};

export default connect(null, { fetchBook })(Book);
