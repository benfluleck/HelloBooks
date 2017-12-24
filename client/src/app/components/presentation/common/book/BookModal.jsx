import React from 'react';
import { Modal, Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';

/**
 *
 * @class BookModal
 *
 * @extends {React.Component}
 */
class BookModal extends React.PureComponent {
  /**
   *
   * @returns {Component} Component
   *
   * @memberOf BookModal
   */
  render() {
    const { header, actions, books } = this.props;
    return (
      <Modal id="modal" fixedFooter header={header} actions={actions} modalOptions={{ dismissible: true, inDuration: 30 }} >
        <Row>
          <div className="loan-book">
            <Col m={12}l={6}>
              <div className="card-image" >
                <img
                  className="modal-image"
                  src={this.props.books.bookImage}
                  alt="Title"
                />
              </div>
            </Col>
            <Col m={12} l={6}>
              <div className="book-modal modal-title">
                Book Number: # {this.props.books.id}
              </div>
              <div className="book-modal modal-title">
                Title: {this.props.books.title}
              </div>
              <hr />
              <div className="book-modal">
                Author: {this.props.books.author}
              </div>
              <div className="book-modal">
                Description: {this.props.books.description}
              </div>
            </Col>
          </div>
          {this.props.children}
        </Row>
      </Modal>
    );
  }
}

BookModal.defaultProps = {
  children: null,
  header: '',
  books: {},
  actions: null
};


BookModal.propTypes = {
  children: PropTypes.element,
  books: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  header: PropTypes.string,
  actions: PropTypes.element
};


export default BookModal;

